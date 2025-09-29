import dataSplitter from "./dataSplitter.js";

const size = 50;
const overlap = 10;

async function splitTheData(data) {
  const splitter = await dataSplitter.createRecursiveCharacterTextSplitter(
    size,
    overlap
  );

  return await dataSplitter.splitTheData(data, splitter);
}

export default {
  splitTheData,
};
