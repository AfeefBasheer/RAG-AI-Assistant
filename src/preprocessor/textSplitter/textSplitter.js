import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

function createRecursiveCharacterTextSplitter(size, overlap) {
  try {
    return new RecursiveCharacterTextSplitter({
      chunkSize: size,
      chunkOverlap: overlap,
    });
  } catch (err) {
    console.log(err + "-createRecursiveCharacterTextSplitter | textSplitter");
  }
}

export default { createRecursiveCharacterTextSplitter };
