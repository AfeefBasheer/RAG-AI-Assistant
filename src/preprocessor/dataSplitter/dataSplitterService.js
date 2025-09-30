import dataSplitter from "./dataSplitter.js";

async function splitTheData(data,size,overlap) {
  const splitter = await dataSplitter.createRecursiveCharacterTextSplitter(
    size,
    overlap
  );

  const splittedData =  await dataSplitter.splitTheData(data, splitter);
  return await dataSplitter.assignSplitDataId(splittedData)
}

export default {
  splitTheData,
};
