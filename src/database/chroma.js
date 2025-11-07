import { ChromaClient } from "chromadb";
import dotenv from "dotenv";

dotenv.config();

let client = undefined;

async function createAndConnectToClient() {
  try {
    client = new ChromaClient({
      host: process.env.CHROMA_HOST,
      port: Number(process.env.CHROMA_PORT), // ensure it's a number
      ssl: false,
    });

    // Await the heartbeat or version properly
    const versionInfo = await client.version();
    console.log("Chroma version:", versionInfo);

    // Optional: test heartbeat
    const heartbeat = await client.heartbeat();
    console.log("Chroma heartbeat:", heartbeat);

    console.log("ChromaDB successfully connected");
  } catch (err) {
    console.error(err, "- ChromaDB not connected");
  }
}

async function getClient() {
  if (!client) {
    console.log("Client not created");
    return null;
  }
  return client;
}

export default { createAndConnectToClient, getClient };
