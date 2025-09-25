import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

let textSplitter = undefined;

 async function createRecursiveCharacterTextSplitter(size, overlap) {
  try {
    textSplitter = await new RecursiveCharacterTextSplitter({
      chunkSize: size,
      chunkOverlap: overlap,
    });
    console.log("Text Splitter Initiated.")
  } catch (err) {
    console.log(err + " -createRecursiveCharacterTextSplitter | textSplitter");
  }
}

async function getRecursiveCharacterTextSplitter() {
  try {
    if (textSplitter) return await textSplitter;
    else console.log("TextSplitter not created.");
  } catch (err) {
    console.log(err + " -getRecursiveCharacterTextSplitter | textSplitter");
  }
}

export default {
  createRecursiveCharacterTextSplitter,
  getRecursiveCharacterTextSplitter,
};
