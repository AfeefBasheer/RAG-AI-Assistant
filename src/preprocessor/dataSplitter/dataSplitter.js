import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import idGenerator from "./idGenerator.js";

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

async function assignSplitDataId(splittedData){
  try{
    splittedData.forEach((item)=>{
      item.id = idGenerator.createEmbeddingId()
    })
    return splittedData
  }catch(err){
    console.log(err + "- assignSplitDataId | textSplitter")
  }
}

export default {
  createRecursiveCharacterTextSplitter,
  splitTheData,
  assignSplitDataId,
};
