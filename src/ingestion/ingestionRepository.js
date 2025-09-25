import database from "../database/chroma.js";
async function createIngestionCollection(collectionName) {
  try {
    const client = await database.getClient();
    return await client.getOrCreateCollection({
      name: collectionName,
    });
  } catch (err) {
    console.error("❌ createIngestionCollection failed:", err);
    throw err;
  }
}

async function insertDocumentsToCollection(documents, collection) {
  try {
    return await collection.add({
      ids: documents.map((_, i) => `doc_${i}`),
      embeddings: documents.map((doc) => doc.embedding),
      documents: documents.map((doc) => doc.text),
      metadatas: documents.map((doc) => doc.metadata || {}),
    });
  } catch (err) {
    console.log(err + "insertDocumentsToCollection | injestionRepository");
  }
}

  let collection = await ingestionRepository.createIngestionCollection({
    name: "ingestion-collection",
    embeddingFunction: (texts) =>
      Promise.all(
        texts.map(
          (t) =>
            textEmbedder(t, { pooling: "mean", normalize: true }).then((e) =>
              Array.from(e.data)
            ) // flatten tensor
        )
      ),
  });

  await collection.add({
    ids: splited.map((_, i) => `doc_${i}`),
    embeddings: embeddings.map((e) => Array.from(e.data)), \
    documents: splited.map((d) => d.pageContent),
    metadatas: splited.map((d, i) => ({ source: "my_document", chunk: i })),
  });
export default { createIngestionCollection, insertDocumentsToCollection };
