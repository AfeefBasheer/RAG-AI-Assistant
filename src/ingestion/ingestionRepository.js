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

async function deleteIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    console.log(await client.listCollections())
    if(collectionName) return await client.deleteCollection(collectionName);
    let allCollection = await client.listCollections()
    allCollection.forEach(async (collection)=>{
      await client.deleteCollection(collection);
    })
    return client.listCollections()
  } catch (err) {
    
    console.error("DeleteIngestionCollection failed:", err);
  }
}

async function insertDocumentsToCollection(data, collection) {
  try {
    const flatMetadatas = data.metadatas.map((meta) => {
      return Object.fromEntries(
        Object.entries(meta).map(([k, v]) => [k, JSON.stringify(v)])
      );
    });

    return await collection.add({
      ids: data.ids,
      embeddings: data.embeddings,
      documents: data.contents,
      metadata: flatMetadatas,
    });
  } catch (err) {
    console.error("insertDocumentsToCollection failed:", err);
  }
}

export default {
  createIngestionCollection,
  insertDocumentsToCollection,
  deleteIngestionCollection
};
