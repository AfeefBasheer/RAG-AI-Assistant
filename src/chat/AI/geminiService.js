import gemini from "./gemini.js";

async function createGemini() {
  return await gemini.createGemini();
}

async function getGemini() {
  return await gemini.getGemini();
}

export default { getGemini, createGemini };
