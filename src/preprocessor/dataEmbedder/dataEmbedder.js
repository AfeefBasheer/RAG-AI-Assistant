import { pipeline } from "@xenova/transformers";

async function createEmbedder() {
  try {
    return await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  } catch (err) {
    console.error("Failed to create embedder:", err);
  }
}

async function embedTheData(splitData, embedder) {
  return await Promise.all(
    splitData.map((d) =>
      embedder(d.pageContent, { pooling: "mean", normalize: true })
    )
  );
}

export default { createEmbedder, embedTheData };
