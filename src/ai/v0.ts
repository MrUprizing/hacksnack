import { generateText } from "ai";
import { vercel } from "@ai-sdk/vercel";

export async function generateJsxFromDescription(
  description: string,
  data: any,
) {
  const prompt = `
You are a React UI generator. Your job is to generate a single JSX component based on the following description and data.

Description:
${description}

Data (as JSON):
${JSON.stringify(data, null, 2)}

Instructions:
- Only return the JSX code, nothing else.
- Use inline styles (style={{ ... }}) for all styling. Do NOT use Tailwind or external CSS.
- The component must be visually appealing and match the description.
- Use only valid JSX and React best practices.
- Do not include explanations, only the JSX.
- only use html no return, no fuction, no objets only html and style
- Dont add nothing else, only the html/style code only thath.
`;

  return await generateText({
    model: vercel("v0-1.5-md"),
    prompt,
  });
}
