import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function createRecursiveCharacterTextSplitter(size, overlap) {
  try {
    return await new RecursiveCharacterTextSplitter({
      chunkSize: size,
      chunkOverlap: overlap,
    });
  } catch (err) {
    console.log(err + " -createRecursiveCharacterTextSplitter | textSplitter");
  }
}

async function splitTheData(data, dataSplitter) {
  try {
    return await dataSplitter.createDocuments([data]);
  } catch (err) {
    console.log(err + " - splitTheData | textSplitter");
  }
}

export default {
  createRecursiveCharacterTextSplitter,
  splitTheData,
};
