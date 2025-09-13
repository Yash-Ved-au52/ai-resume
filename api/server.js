import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import analyzeResumeRoute from "./routes/analyzeResume.js";
import coverLetterRoute from "./routes/coverLetter.js";
import chatRoute from "./routes/chat.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Routes
app.use("/api/analyze-resume", analyzeResumeRoute);
app.use("/api/cover-letter", coverLetterRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
