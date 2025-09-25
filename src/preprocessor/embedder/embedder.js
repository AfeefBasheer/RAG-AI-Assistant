import { pipeline } from "@xenova/transformers";

let embedder = undefined;

async function createEmbedder() {
  try {
    // Download + cache the model (loads once, reuses later)
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedder initialized");
  } catch (err) {
    console.error("Failed to create embedder:", err);
  }
}

async function getEmbedder() {
  try {
    if (!embedder) {
      console.error("Embedder not initialized. Run createEmbedder() first.");
    } else {
      return await embedder;
    }
  } catch (err) {
    console.log(err + " - getEmbedder | embedder.js");
  }
  // const output = await embedder(text, { pooling: "mean", normalize: true });
  // return Array.from(output.data);
}

export default { createEmbedder, getEmbedder };
