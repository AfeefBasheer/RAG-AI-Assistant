import geminiService from "../AI/geminiService.js";
import textSplitterService from "../../preprocessor/textSplitter/textSplitterService.js";
import embedderService from "../../preprocessor/embedder/embedderService.js";
import chroma from "../../database/chroma.js";
import ingestionRepository from "../../ingestion/ingestionRepository.js";

const sampleText = `
      Mars is known as the Red Planet. 
      Venus is often called Earth's twin. 
      Jupiter is the largest planet in our solar system. `;

async function check() {

  let chromaDBClient = await chroma.getClient();
  let gemini = await geminiService.getGemini();

  // 1. Split sample text into chunks


  // 2. Generate embeddings for each chunk
  const embeddings = await Promise.all(
    splited.map((d) =>
      textEmbedder(d.pageContent, { pooling: "mean", normalize: true })
    )
  );

  // 3. Create (or fetch) a Chroma collection
  let collection = await ingestionRepository.createIngestionCollection({
    name: "ingestion-collection",
    embeddingFunction: (texts) =>
      Promise.all(
        texts.map(
          (t) =>
            textEmbedder(t, { pooling: "mean", normalize: true }).then((e) =>
              Array.from(e.data)
            ) // flatten tensor
        )
      ),
  });

  // 4. Insert documents + embeddings into the collection
  await collection.add({
    ids: splited.map((_, i) => `doc_${i}`),
    embeddings: embeddings.map((e) => Array.from(e.data)), // flatten tensor → plain array
    documents: splited.map((d) => d.pageContent),
    metadatas: splited.map((d, i) => ({ source: "my_document", chunk: i })),
  });

  console.log("✅ Inserted into Chroma:", splited.length, "chunks");
  const question = "what is mars called?";
  const results = await collection.query({
    queryTexts: [question],
    nResults: 3,
  });

  const retrievedChunks = results.documents.flat();
  console.log("🔍 Retrieved context:", retrievedChunks);

  // 4. Build a context prompt for Gemini
  const context = retrievedChunks.join("\n\n");
  const prompt = `
  You are a helpful assistant. 
  Use the following context to answer the question.

  Context:
  ${context}

  Question: ${question}
  Answer:
  `;

  // 5. Ask Gemini
  const response = await gemini.generateContent(prompt);
  const answer = response.response.text();

  console.log("🤖 Gemini Answer:", answer);
}

export default { check };
