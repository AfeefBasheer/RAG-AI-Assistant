import gemini from "./gemini.js";

async function createGemini() {
  return await gemini.createGemini();
}

async function askGemini(prompt) {
  let response = "";
  await gemini.askGeminiStream(prompt, (chunk) => {
    response = response + chunk;
  });
  if (response == "" || !response)
    response = await gemini.askGeminiWithRetry(prompt);

  return response;
}


export default { createGemini, askGemini };
