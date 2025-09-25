import textSplitter from "./textSplitter.js";

async function createRecursiveCharacterTextSplitter(size, overlap) {
  return await textSplitter.createRecursiveCharacterTextSplitter(size, overlap);
}

async function getTextSplitter() {
  return await textSplitter.getRecursiveCharacterTextSplitter();
}

async function splitTheData() {
  return await textSplitterService
    .getTextSplitter(data)
    .createDocuments([sampleText], [{ source: sources }]);
}

export default {
  getTextSplitter,
  createRecursiveCharacterTextSplitter,
  splitTheData,
};
