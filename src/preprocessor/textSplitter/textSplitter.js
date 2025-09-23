import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

function createRecursiveCharacterTextSplitter(size, overlap) {
  return new RecursiveCharacterTextSplitter({
    chunkSize: size,
    chunkOverlap: overlap,
  });
}

export default { createRecursiveCharacterTextSplitter };
