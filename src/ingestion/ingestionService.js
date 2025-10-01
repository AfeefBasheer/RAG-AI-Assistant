import preprocessorService from "../preprocessor/preprocessorService.js";
import ingestionRepository from "./ingestionRepository.js";

async function ingestData(ingestionData) {
  const preprocessedData = await preprocessorService.preprocessData(ingestionData.content);

  const collection = await ingestionRepository.createIngestionCollection(
    ingestionData.collection
  );

  const ingestedData =await ingestionRepository.insertDocumentsToCollection(preprocessedData,collection)
  return ingestedData
}

async function deleteIngestionCollection(){

  return await ingestionRepository.deleteIngestionCollection()
}

export default { ingestData,deleteIngestionCollection };
