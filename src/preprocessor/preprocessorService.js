import dataSplitterService from "./dataSplitter/dataSplitterService.js";
import dataEmbedderService from "./dataEmbedder/dataEmbedderService.js";
import splitterConstants from "./dataSplitter/splitterConstants.js";
import dataNormalizer from "./dataNormalizer.js";

async function preprocessData(data) {
  let splittedData = await dataSplitterService.splitTheData(data);
  let embeddedData = await dataEmbedderService.embedTheData(
    splittedData,
    splitterConstants.dataSplitSize,
    splitterConstants.dataOverlap
  );

  const normalizedData = await dataNormalizer.normalizeGivenData(splittedData,embeddedData)
  return normalizedData;
}

async function preprocessQuery(userQuery) {

    let splittedQuery = await dataSplitterService.splitTheData(userQuery.query);

    let embeddedQuery = await dataEmbedderService.embedTheData(
      splittedQuery,
      splitterConstants.querySplitSize,
      splitterConstants.queryOverlap
    );
    const normalizedData = await dataNormalizer.normalizeGivenData(splittedQuery,embeddedQuery)
  return normalizedData;
}
export default { preprocessData, preprocessQuery };
