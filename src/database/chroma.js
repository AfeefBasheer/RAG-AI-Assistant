import { ChromaClient } from "chromadb";

let client = undefined;

async function createAndConnectToClient() {
  try {
    client = new ChromaClient({
      host: process.env.CHROMA_HOST,
      port: process.env.CHROMA_PORT,
      ssl: false,
    });
    console.log("chroma-version " + (await client.version()));
    console.log("ChromaDB succesfully connected");
  } catch (err) {
    console.log(err + " - ChromaDB not connected");
  }
}

async function getClient() {
  try {
    if (client) return client;
    else console.log("Client not Created");
  } catch (err) {
    console.log(err + " - Cannot get Client");
  }
}
export default { createAndConnectToClient, getClient };
