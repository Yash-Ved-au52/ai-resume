import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import { extractResumeText } from "../utils/resumeParser.js";

const router = express.Router();
const upload = multer(); // handles multipart/form-data

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    // Extract text from uploaded PDF
    const resumeText = await extractResumeText(req.file.buffer);

    // Prompt
    const prompt = `
Analyze this resume for ATS optimization:

Resume:
${resumeText}

Provide:
- ATS Score (0–100)
- Strengths
- Weaknesses
- Suggested Improvements
`;

    // Call Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return res.status(500).json({ error: "Gemini API request failed" });
    }

    const data = await response.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return res.status(500).json({ error: "Failed to get response from Gemini API" });
    }

    // -------------------------
    // PARSE Gemini output into structured JSON
    // -------------------------
    const scoreMatch = output.match(/ATS Score.*?(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    const strengthsMatch = output.match(/\*\*Strengths:\*\*(.*?)\n\n\*\*Weaknesses/ms);
    const strengths = strengthsMatch
      ? strengthsMatch[1]
          .split("\n")
          .map(s => s.replace(/^\*+\s*/, "").trim())
          .filter(Boolean)
      : [];

    const weaknessesMatch = output.match(/\*\*Weaknesses:\*\*(.*?)\n\n\*\*Suggested Improvements/ms);
    const weaknesses = weaknessesMatch
      ? weaknessesMatch[1]
          .split("\n")
          .map(w => w.replace(/^\*+\s*/, "").trim())
          .filter(Boolean)
      : [];

    const suggestionsMatch = output.match(/\*\*Suggested Improvements:\*\*(.*)/ms);
    const suggestions = suggestionsMatch
      ? suggestionsMatch[1]
          .split("\n")
          .map(s => s.replace(/^\d+\.\s*/, "").trim())
          .filter(Boolean)
      : [];

    // Send structured JSON
    res.json({ score, strengths, weaknesses, suggestions });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

export default router;
