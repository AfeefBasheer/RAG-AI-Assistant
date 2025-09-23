import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const link =
  "https://api-inference.huggingface.co/pipeline/feature-extraction/";

async function createEmbedder() {
  try {
    return await fetch(`${link}${process.env.HUGGING_FACE_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err + " - createEmbedder | embedder");
  }
}

export default { createEmbedder };
