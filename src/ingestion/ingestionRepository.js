import database from "../database/chroma.js";

// No-op embedding function for pre-embedded vectors
const noopEmbeddingFunction = {
  embed: async (data) => data, // just returns precomputed embeddings
};

async function createIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    return await client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: noopEmbeddingFunction, // required in 1.0.0
    });
  } catch (err) {
    console.error("createIngestionCollection failed:", err);
    throw err;
  }
}

async function deleteIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    if (collectionName) return await client.deleteCollection(collectionName);

    const allCollections = await client.listCollections();
    for (const collection of allCollections) {
      await client.deleteCollection(collection);
    }
    return client.listCollections();
  } catch (err) {
    console.error("deleteIngestionCollection failed:", err);
  }
}

async function insertDocumentsToCollection(data, collection) {
  try {
    const flatMetadatas = data.metadatas.map((meta) =>
      Object.fromEntries(
        Object.entries(meta).map(([k, v]) => [k, JSON.stringify(v)])
      )
    );

    return await collection.add({
      ids: data.ids,
      embeddings: data.embeddings, // your precomputed embeddings
      documents: data.contents,
      metadatas: flatMetadatas, // notice correct property name: "metadatas"
    });
  } catch (err) {
    console.error("insertDocumentsToCollection failed:", err);
  }
}

export default {
  createIngestionCollection,
  insertDocumentsToCollection,
  deleteIngestionCollection,
};
