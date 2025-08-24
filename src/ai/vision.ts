import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Type guard para bloques de texto
function isTextBlock(block: any): block is { type: "text"; text: string } {
  return (
    block &&
    typeof block === "object" &&
    block.type === "text" &&
    typeof block.text === "string"
  );
}

// Esta función recibe la URL y devuelve el JSON nutricional
export async function analyzeFoodImage(url: string) {
  const prompt = `
You are a nutrition expert. Analyze the food in the image and return ONLY a JSON object with the following fields (do not include any explanation):

{
  "description": string,
  "calories": number,
  "protein": number,
  "carbohydrates": number,
  "fat": number,
  "fiber": number,
  "sugar": number,
  "sodium": number,
  "mealType": string // One of: "breakfast", "lunch", "dinner", "snack" (if possible to infer, otherwise null)
}

If you are not sure about a value, make your best estimate. Do not include any text outside the JSON object.
`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "url",
              url,
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  // Busca el primer bloque de tipo texto en el contenido usando el type guard
  const textBlock = Array.isArray(message.content)
    ? message.content.find(isTextBlock)
    : undefined;

  if (!textBlock) throw new Error("No nutrition JSON found in response");

  // Aquí el type assertion es CLAVE para que TypeScript no marque error
  const match = (textBlock as { text: string }).text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No nutrition JSON found in response");
  return JSON.parse(match[0]);
}
