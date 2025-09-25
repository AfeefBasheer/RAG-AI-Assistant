import embedder from "./embedder.js";

async function createEmbedder() {
  return await embedder.createEmbedder();
}

async function getEmbedder() {
  return await embedder.getEmbedder();
}

async function embedTheData() {
  return await Promise.all(
    embedderService
      .getEmbedder()
      .splited.map((d) =>
        embedder(d.pageContent, { pooling: "mean", normalize: true })
      )
  );
}

export default { getEmbedder, createEmbedder, embedTheData };
