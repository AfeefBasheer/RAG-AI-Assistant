function buildPrompt(userQuery, retrievedChunks) {
  // Join all retrieved chunks into context
  const context = retrievedChunks.documents
    .map((chunk, i) => `${i + 1}. ${chunk}`)
    .join("\n\n");
    
  // Build the prompt
  const prompt = `"You are a clever, structured, and friendly AI assistant.
Respond clearly and helpfully, using step-by-step explanations, bullet points, or short sections when useful.
Keep a light, witty tone but stay respectful.
use occasional emojis.
If the question is unclear, ask for clarification instead of guessing.
Be concise, accurate, and genuinely helpful."

Context:
${context}

Question:
${userQuery}

`;
  return prompt;
}

export default {
  buildPrompt,
};
