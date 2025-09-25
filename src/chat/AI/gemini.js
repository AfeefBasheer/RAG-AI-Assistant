import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config();

let gemini = undefined;

async function createGemini() {
  try {
  const genAI = await new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  gemini = await genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("gemini-creation-called")
  } catch (err) {
    console.log(err + " - createGemini | gemini");
  }
}

async function getGemini() {
  try {
    if (gemini) return await gemini;
    else console.log("gemini not created.");
  } catch (err) {
    console.log(err + " - getGemini | gemini");
  }
}

export default { createGemini, getGemini };
