import database from "../database/chroma.js";
async function createIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    return await client.getOrCreateCollection({
      name: 'my_collection',
    });
  } catch (err) {
    console.log(err + " createIngestionCollection | injestionRepository");
  }
}

async function insertDocumentsToCollection(documents, collection) {
  try {
    return await await collection.add({
      ids: documents.map((_, i) => `doc_${i}`),
      embeddings: documents.map((doc) => doc.embedding),
      documents: documents.map((doc) => doc.text),
      metadatas: documents.map((doc) => doc.metadata || {}),
    });
  } catch (err) {
    console.log(err + "insertDocumentsToCollection | injestionRepository");
  }
}

export default { createIngestionCollection, insertDocumentsToCollection };
