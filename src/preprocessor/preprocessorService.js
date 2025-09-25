import dataSplitterService from "./dataSplitter/dataSplitterService.js";
import dataEmbedderService from "./dataEmbedder/dataEmbedderService.js";

async function preprocessData(data) {
  let splittedData = await dataSplitterService.splitTheData(data);
  let embeddedData = await dataEmbedderService.embedTheData(splittedData);
  return [splittedData, embeddedData];
}

export default { preprocessData };
