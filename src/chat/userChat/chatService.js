// import retreiverService from "../retriever/retrieverService.js";
// import geminiService from "../AI/geminiService.js";
import preprocessorService from "../../preprocessor/preprocessorService.js";

async function handleUserQuery(userQuery) {
  const preprocessedQuery = await preprocessorService.preprocessQuery(
    userQuery
  );
  console.log(preprocessedQuery)
}

export default { handleUserQuery };
