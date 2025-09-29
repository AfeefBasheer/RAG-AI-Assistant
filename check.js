import fetch from "node-fetch";

async function inspectChromaCollection(collectionName) {
  try {
    const res = await fetch(`http://localhost:8000/collections/${collectionName}/items`);
    if (!res.ok) {
      console.error("Failed to fetch collection:", res.statusText);
      return;
    }

    const data = await res.json();

    const { ids, documents, embeddings, metadatas } = data;

    console.log(`Collection: ${collectionName}`);
    console.log(`Total items: ${ids.length}\n`);

    ids.forEach((id, idx) => {
      console.log(`Item #${idx + 1}`);
      console.log("ID:", id);
      console.log("Document:", documents[idx]);
      console.log("Metadata:", metadatas[idx]);
      console.log("Embedding snippet:", embeddings[idx].slice(0, 10), "..."); // first 10 values
      console.log("-----");
    });

  } catch (err) {
    console.error("Error inspecting collection:", err);
  }
}

// Call it with your collection name
inspectChromaCollection("news-collection");
