import { GoogleGenAI } from "@google/genai";
console.log(import.meta.env);
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function testGeminiConnection() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with exactly: Connection Successful",
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return "Connection Failed";
  }
}
export async function askGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an API architect.

Return ONLY valid JSON.

Example format:

{
  "name": "",
  "description": "",
  "provider": "Google Gemini",
  "model": "Gemini 2.5 Flash",
  "endpoints": [
    {
      "method": "",
      "path": "",
      "description": ""
    }
  ]
}

User Request:
${prompt}
`,
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function generateApiExample(
  apiName,
  endpoint,
  method,
  description
) {
  const prompt = `
You are an API documentation generator.

API: ${apiName}
Method: ${method}
Endpoint: ${endpoint}
Description: ${description}

Generate ONLY valid JSON in this format:

{
  "request": {
  },
  "response": {
  }
}

Do not include markdown.
Do not use \`\`\`.
Return only JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}