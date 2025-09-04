import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates || !data.candidates[0])
      return res.status(500).json({ error: "Failed to get response from Gemini API" });

    res.json({ reply: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

export default router;
