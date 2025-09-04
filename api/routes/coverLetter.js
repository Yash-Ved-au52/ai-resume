import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { resumeText, jobTitle, companyName } = req.body;

    if (!resumeText || !jobTitle || !companyName) {
      return res.status(400).json({ error: "Resume text, job title, and company name are required" });
    }

    const prompt = `
Write a professional cover letter for the following job:

Job Title: ${jobTitle}
Company: ${companyName}

Candidate Resume:
${resumeText}

Requirements:
- Professional tone
- Tailored to the job and company
- Highlight strengths relevant to the role
`;

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

    const data = await response.json();

    if (!data.candidates || !data.candidates[0])
      return res.status(500).json({ error: "Failed to get response from Gemini API" });

    res.json({ coverLetter: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});

export default router;
