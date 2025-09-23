import embedder from "./embedder.js";

async function getEmbedder() {
  return await embedder.createEmbedder();
}

export default { getEmbedder };
