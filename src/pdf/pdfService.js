import pdfParser from "./pdfParser.js";

async function parsePDF(filePath) {
  return await pdfParser.parsePDF(filePath)
}

export default { parsePDF };
