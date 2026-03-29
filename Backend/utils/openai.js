import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { GoogleGenAI } from "@google/genai";

// client automatically reads GEMINI_API_KEY from env
const ai = new GoogleGenAI({});

const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
    });
    return response.text; //reply
  } catch (error) {
    console.log(error);
  }
};
export default getOpenAIAPIResponse;
