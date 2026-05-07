import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: "You are a helpful assistant for UC Berkeley staff and students. Answer questions regarding UC Berkeley's AI policies, academic integrity, and campus guidelines. Keep your answers concise, professional, and accurate.",
    messages,
  });

  return result.toDataStreamResponse();
}
