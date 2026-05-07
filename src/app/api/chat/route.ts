import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      { role: 'system', content: "You are a helpful assistant for UC Berkeley staff and students. Answer questions regarding UC Berkeley's AI policies, academic integrity, and campus guidelines. Keep your answers concise, professional, and accurate." },
      ...messages
    ]
  });

  const stream = OpenAIStream(response as any);
  return new StreamingTextResponse(stream);
}
