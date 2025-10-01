

async function normalizeGivenData(splitData,embeddedData) {
  try {
    const normalizedData = {
      ids: [],
      embeddings: [],
      contents: [],
      metadatas: []
    };

    splitData.forEach((item, i) => {

      normalizedData.ids.push(item.id);
      normalizedData.contents.push(item.pageContent);

      // flatten metadata (stringify nested stuff)
      const flatMeta = Object.fromEntries(
        Object.entries(item.metadata).map(([k, v]) => [
          k,
          typeof v === "object" ? JSON.stringify(v) : v
        ])
      );
      normalizedData.metadatas.push(flatMeta);

      // convert Float32Array → plain array
      normalizedData.embeddings.push(Array.from(embeddedData[i].data));
    });
    return normalizedData;
  } catch (err) {
    console.error(err + " - normalizeIngestionData");
  }
}

export default {normalizeGivenData}