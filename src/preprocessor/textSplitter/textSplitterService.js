import textSplitter from "./textSplitter.js";

async function getTextSplitter(size, overlap) {
  return textSplitter.createRecursiveCharacterTextSplitter(size, overlap);
}

export default { getTextSplitter };
