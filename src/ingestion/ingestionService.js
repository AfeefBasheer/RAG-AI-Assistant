import preprocessorService from "../preprocessor/preprocessorService.js";
import ingestionRepository from "./ingestionRepository.js";
import pdfService from "../pdf/pdfService.js";

async function ingestData(filePath, collectionName) {
  const ingestionData = await pdfService.parsePDF(filePath);

  const preprocessedData = await preprocessorService.preprocessData(
    ingestionData
  );

  const collection = await ingestionRepository.createIngestionCollection(
    collectionName
  );

  console.log(await collection.count());
  const ingestedData = await ingestionRepository.insertDocumentsToCollection(
    preprocessedData,
    collection
  );
  console.log(ingestedData);
  console.log(await collection.count());
  return ingestedData;
}

async function deleteIngestionCollection() {
  return await ingestionRepository.deleteIngestionCollection();
}

export default { ingestData, deleteIngestionCollection };
