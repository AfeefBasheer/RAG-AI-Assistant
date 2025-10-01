import retreiverRepository from "./retreiverRepository.js";
import ingestionRepository from "../../ingestion/ingestionRepository.js";

async function retreiveData(userQuery, collectionName) {
  let collection = await ingestionRepository.createIngestionCollection(
    collectionName
  );

  let retreivedData = await retreiverRepository.retrieveData(
    userQuery,
    collection
  );
  return await retreiverRepository.getRelevantData(retreivedData);
}

export default { retreiveData };
