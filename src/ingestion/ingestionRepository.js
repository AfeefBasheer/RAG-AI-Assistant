import database from "../database/chroma.js";

async function createIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    return await client.getOrCreateCollection({
      name: collectionName,
    });
  } catch (err) {
    console.error("createIngestionCollection failed:", err);
    throw err;
  }
}

async function insertDocumentsToCollection(data, collection) {
  try{
 const flatMetadatas = data.metadatas.map(meta => {
  return Object.fromEntries(
    Object.entries(meta).map(([k, v]) => [k, JSON.stringify(v)])
  );
});

    return await collection.add({
    ids: data.ids,
    embeddings: data.embeddings,
    documents: data.contents,
    metadata:flatMetadatas
})

  } catch (err) {
    console.error("insertDocumentsToCollection failed:", err);
  }
}

export default {
  createIngestionCollection,
  insertDocumentsToCollection,
};
