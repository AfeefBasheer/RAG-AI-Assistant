import textSplitterService from "./textSplitter/textSplitterService.js";

function preprocessData(data, size, overlap) {
  console.log(textSplitterService.getTextSplitter(size, overlap));
}

export default { preprocessData };
