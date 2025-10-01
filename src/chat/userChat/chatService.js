import retreiverService from "../retriever/retrieverService.js";
// import geminiService from "../AI/geminiService.js";
import preprocessorService from "../../preprocessor/preprocessorService.js";
import geminiService from "../AI/geminiService.js"

async function handleUserQuery(userQuery) {
  const preprocessedQuery = await preprocessorService.preprocessQuery(
    userQuery.query
  );

  const retreivedData = await retreiverService.retreiveData(
    preprocessedQuery,
    userQuery.collection
  );

  geminiService.getGemini()
  

  return retreivedData;
}

export default { handleUserQuery };
