import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import { extractResumeText } from "../utils/resumeParser.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Extract resume text
    const resumeText = await extractResumeText(req.file.buffer);

    // Prompt for Gemini
    const prompt = `
Write a professional cover letter tailored to this job description and candidate resume.

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

Requirements:
- Professional tone
- Tailored to the job description
- Highlight strengths relevant to the role
`;

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
      return res.status(500).json({ error: "No response from Gemini API" });
    }

    res.json({ coverLetter: output });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});

export default router;
