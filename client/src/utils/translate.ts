import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAmfeEs2T6f8FsxElMrEjugDdNC1v73KPg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function translateText(text:any, targetLanguage:String) {

const prompt = `Translate the following text into (send only the translated text without quotations on both sides) ${targetLanguage}: "${text}"`
const result = await model.generateContent(prompt);
return (result.response.text());

}