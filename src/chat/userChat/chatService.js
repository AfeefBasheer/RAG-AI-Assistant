import retreiverService from "../retriever/retrieverService.js";
import preprocessorService from "../../preprocessor/preprocessorService.js";
import geminiService from "../AI/geminiService.js";
import chatRepository from "./chatRepository.js";

async function handleUserQuery(userQuery) {
  const preprocessedQuery = await preprocessorService.preprocessQuery(
    userQuery.query
  );
  console.log(preprocessedQuery)
  const retreivedData = await retreiverService.retreiveData(
    preprocessedQuery,
    userQuery.collection
  );
  const prompt = chatRepository.buildPrompt(userQuery.query,retreivedData)
  return await geminiService.askGemini(prompt);
}

export default { handleUserQuery };
