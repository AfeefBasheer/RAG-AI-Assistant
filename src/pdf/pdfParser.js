import { PDFParse } from "pdf-parse";

async function parsePDF(loc) {
  try {
    const parser = new PDFParse({ url: loc });
    const result = await parser.getText();
    return result.text
  } catch {
    console.log("Error occured on pdf-parser");
  }
}
export default { parsePDF };
