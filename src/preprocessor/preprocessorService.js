import textSplitterService from "./textSplitter/textSplitterService.js";
import embedderService from "./embedder/embedderService.js";

async function preprocessData(data, sources) {
  let splittedData = await textSplitterService.splitTheData(data);
  let embeddedData = await embedderService.embedTheData(splittedData);
}

export default { preprocessData };
