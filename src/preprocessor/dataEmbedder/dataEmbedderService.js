import dataEmbedder from "./dataEmbedder.js";

async function embedTheData(splitData) {
  const embedder = await dataEmbedder.createEmbedder();
  return await dataEmbedder.embedTheData(splitData,embedder);
}

export default {
  embedTheData,
};
