import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let gemini = undefined;

async function createGemini() {
  try {
    gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("gemini-connected");
  } catch (err) {
    console.log(err + " - createGemini | gemini");
  }
}


async function askGeminiWithRetry(prompt, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });
    } catch (err) {
      if (i < retries - 1) {
        console.log(`Retry ${i + 1} after error: ${err.message}`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

export async function askGeminiStream(prompt, onChunk) {
  if (!gemini) throw new Error("Gemini is not initialized. Call createGemini() first.");

  try {
    // Create a streaming session
    const stream = await gemini.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disable Gemini's "thinking" mode
        },
      },
    });

    // Stream chunks as they arrive
    for await (const chunk of stream) {
      const chunkText = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (chunkText) {
        onChunk(chunkText);
      }
    }

    // Get the final response object if you need it
    const finalResponse = await stream.response;
    return finalResponse;

  } catch (err) {
    console.error(" Streaming error:", err);
    throw err;
  }
}



export default { createGemini, askGeminiWithRetry,askGeminiStream };
