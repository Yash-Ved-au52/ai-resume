import pdfParse from "pdf-parse";

export async function extractResumeText(fileBuffer) {
  if (!fileBuffer) throw new Error("No file buffer provided");
  try {
    const data = await pdfParse(fileBuffer);
    return data.text || "";
  } catch (err) {
    console.error("PDF parsing error:", err);
    throw new Error("Failed to parse PDF");
  }
}
