import * as pdfjsLib from "pdfjs-dist";

// pdf.js runs its heavy PDF-parsing work in a background "worker" thread
// so it doesn't freeze the browser tab. This line tells it where to find
// that worker script. Vite's `?url` import gives us the correct final path.
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// Reads a PDF File object and returns all its text content as one big string,
// with real line breaks preserved (based on each text chunk's Y position on
// the page, since PDFs don't store "lines" directly - just positioned chunks).
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    let lastY = null;
    let currentLine = "";

    for (const item of textContent.items) {
      // item.transform is a 6-number matrix; index 5 is the Y coordinate
      // (vertical position) of this text chunk on the page.
      const y = item.transform[5];

      if (lastY !== null && Math.abs(y - lastY) > 2) {
        // The Y position jumped meaningfully -> this chunk is on a new line
        fullText += currentLine.trim() + "\n";
        currentLine = item.str;
      } else {
        // Same line as before -> just append with a space
        currentLine += (currentLine ? " " : "") + item.str;
      }

      lastY = y;
    }

    // Add whatever's left in currentLine after the loop finishes
    if (currentLine.trim()) {
      fullText += currentLine.trim() + "\n";
    }

    fullText += "\n"; // extra blank line between pages
  }

  return fullText.trim();
}

// Guesses the person's name from extracted resume text.
// Most resumes put the full name as the very first real line of content.
export function guessNameFromText(text) {
  if (!text) return "";

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return "";

  const firstLine = lines[0];

  // A real name is usually short (2-5 words), has no digits, and no @ symbol
  // (which would mean we grabbed an email or phone line by mistake).
  const wordCount = firstLine.split(/\s+/).length;
  const hasDigits = /\d/.test(firstLine);
  const hasAtSymbol = firstLine.includes("@");

  if (wordCount <= 5 && !hasDigits && !hasAtSymbol) {
    return firstLine;
  }

  // Fallback: sometimes the name is followed immediately by contact info
  // on the SAME line (e.g. "Prathamesh Nehete Pune, Maharashtra - +91...").
  // In that case, take just the first 2-3 words as a best guess.
  const words = firstLine.split(/\s+/).slice(0, 3);
  const guess = words.join(" ");
  return guess || "Name not clearly detected";
}