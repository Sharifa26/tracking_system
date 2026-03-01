import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiService = {}

aiService.generateDescription = async (title) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
            Generate a clear and concise task description for the following task.

            Task: "${title}"

            Instructions:
            - Do NOT include headings.
            - Do NOT include markdown.
            - Do NOT include "Task Title".
            - Return plain text only.
            - Maximum 3 sentences.
            - Keep it practical and implementation-focused.
            `;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800
            }
        });
        const response = result.response;
        const text = response.candidates[0].content.parts[0].text;

        console.log(text);

        return text;
    } catch (error) {
        throw new Error("AI description generation failed");
    }
};

export default aiService;
