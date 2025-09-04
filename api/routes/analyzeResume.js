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

    // Extract text from uploaded PDF file
    const resumeText = await extractResumeText(req.file.buffer);

    // Prepare prompt for Gemini API
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
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ error: "Failed to get response from Gemini API" });
    }

    // Send the analysis back to frontend
    res.json({ analysis: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

export default router;
