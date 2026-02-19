
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const getCareerAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the Hot Beans Web Elite Career Concierge. 
        Hot Beans Web is a premium digital agency known for its "Radial Mentorship" and high-performance culture.
        Your tone: Professional, inspiring, sophisticated, yet approachable.
        Key Messaging:
        - We prioritize potential and passion for the web over years of experience.
        - We are heavy users of React, TypeScript, and Tailwind.
        - Mentorship is embedded in our DNA.
        - If someone asks about roles, mention our Engineering, Frontend, Backend, and Design departments.
        - Encourage them to use our Careers portal to filter and find their perfect match.
        - Direct them to the 'Apply Now' section if they seem ready to jump in.
        Be concise and helpful. Don't use bullet points unless absolutely necessary.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Beans are still roasting. While I reconnect, why not explore our Opportunities page?";
  }
};
