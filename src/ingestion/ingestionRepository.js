import database from "../database/chroma.js";
import idGenerator from "./idGenerator.js";

async function createIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    const collections = await client.listCollections();
  console.log(collections);
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
}async function normalizeIngestionData(data) {
  try {
    const splitData = data[0];
    const embeddedData = data[1];

    const normalizedData = {
      ids: [],
      embeddings: [],
      contents: [],
      metadatas: []
    };

    splitData.forEach((item, i) => {
      const id = idGenerator.createEmbeddingId();
      normalizedData.ids.push(id);
      normalizedData.contents.push(item.pageContent);

      // flatten metadata (stringify nested stuff)
      const flatMeta = Object.fromEntries(
        Object.entries(item.metadata).map(([k, v]) => [
          k,
          typeof v === "object" ? JSON.stringify(v) : v
        ])
      );
      normalizedData.metadatas.push(flatMeta);

      // convert Float32Array → plain array
      normalizedData.embeddings.push(Array.from(embeddedData[i].data));
    });
    console.log(normalizedData)
    return normalizedData;
  } catch (err) {
    console.error(err + " - normalizeIngestionData");
  }
}




export default {
  createIngestionCollection,
  insertDocumentsToCollection,
  normalizeIngestionData,
};
