const threshold = 0.5;

async function retrieveData(userQuery, collection) {
  try {
    return await collection.query({
      queryEmbeddings: userQuery.embeddings,
      nResults: 5,
      distance: 1,
      ids: userQuery.ids,
      include: ["documents", "metadatas", "distances"],
    });
  } catch (err) {
    console.log(err + "-");
  }
}

async function getRelevantData(retrievedData) {
  try {
    // flatten nested arrays from Chroma
    retrievedData.ids = retrievedData.ids[0];
    retrievedData.metadatas = retrievedData.metadatas[0];
    retrievedData.documents = retrievedData.documents[0];
    retrievedData.distances = retrievedData.distances[0];

    const filteredIndices = retrievedData.distances
      .map((distance, index) => ({ distance, index }))
      .filter(item => item.distance < threshold)
      .map(item => item.index);

    return {
      ids: filteredIndices.map(i => retrievedData.ids[i]),
      distances: filteredIndices.map(i => retrievedData.distances[i]),
      documents: filteredIndices.map(i => retrievedData.documents[i]),
      metadatas: filteredIndices.map(i => retrievedData.metadatas[i]),
    };
  } catch (err) {
    console.error("Error filtering relevant data:", err);
    return [];
  }
}

export default { retrieveData, getRelevantData };
