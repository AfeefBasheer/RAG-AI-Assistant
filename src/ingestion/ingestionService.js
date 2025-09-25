import preprocessorService from "../preprocessor/preprocessorService.js";

async function ingestData(data) {
  const preprocessedData = preprocessorService.preprocessData(data);
  console.log(preprocessedData);
  //data to be stored must be in preprocessedData

  //get preprocessed data
  //get the collection
  //insertinto collection
}

export default { ingestData };
