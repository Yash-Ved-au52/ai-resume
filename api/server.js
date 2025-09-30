import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import analyzeResumeRoute from "./routes/analyzeResume.js";
import coverLetterRoute from "./routes/coverLetter.js";
import chatRoute from "./routes/chat.js";

dotenv.config();
const app = express();

// Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",  // development
  "https://ai-resume-smoky-omega.vercel.app"  //deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // origin will be undefined for some tools like Postman or certain server-to-server calls
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // agar cookies/auth use kar rahe ho
};

// Use CORS with options
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
app.use("/api/analyze-resume", analyzeResumeRoute);
app.use("/api/cover-letter", coverLetterRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
