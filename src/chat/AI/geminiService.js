import gemini from "./gemini.js";

async function createGemini() {
  return await gemini.createGemini();
}

async function askGemini(prompt) {
  let response = ""
 await gemini.askGeminiStream(prompt,  (chunk) => {
  response = response + chunk
});
return response
}

async function askGeminiWIthRetries(prompts) {
  return await gemini.askGeminiWithRetry(prompts);
}

export default { createGemini, askGemini, askGeminiWIthRetries };
