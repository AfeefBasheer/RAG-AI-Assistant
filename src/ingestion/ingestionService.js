import ingestionRepository from "./ingestionRepository.js";

async function addIngestionCollection(collectionName) {
  return await ingestionRepository.createIngestionCollection(collectionName);
}

async function addDocumentsToCollection(collection) {
  return await ingestionRepository.insertDocumentsToCollection(
    documents,
    collection
  );
}
export default { addIngestionCollection, addDocumentsToCollection };
