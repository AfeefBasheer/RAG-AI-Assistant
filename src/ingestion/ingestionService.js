import preprocessorService from "../preprocessor/preprocessorService.js";
import ingestionRepository from "./ingestionRepository.js";

const collectionName = "afeef-trial";

async function ingestData(data) {
  const preprocessedData = await preprocessorService.preprocessData(data);
  const normalizedData = await ingestionRepository.normalizeIngestionData(
    preprocessedData
  );
  const collection = await ingestionRepository.createIngestionCollection(
    collectionName
  );

  const ingestedData =await ingestionRepository.insertDocumentsToCollection(normalizedData,collection)
  return ingestedData
}

export default { ingestData };
