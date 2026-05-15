import OpenAI from 'openai';
import { analysisOutputSchema } from '@/lib/schemas/analysis';
import { buildAnalysisPrompt, buildCritiquePrompt } from '@/lib/ai/prompts';
import type { FocusMode } from '@/lib/types/analysis';

const OPENAI_MODEL = 'gpt-4.1';
const CLAUDE_MODEL = 'claude-3-7-sonnet-latest';

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}$/);
    if (!match) {
      throw new Error('No se encontró JSON en la salida del modelo');
    }
    return JSON.parse(match[0]);
  }
}

export async function runOpenAIAnalysis(url: string, focus: FocusMode) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: OPENAI_MODEL,
    tools: [{ type: 'web_search_preview' }],
    input: buildAnalysisPrompt(url, focus),
  });

  const text = response.output_text;
  if (!text) {
    throw new Error('OpenAI no devolvió texto');
  }

  return extractJson(text);
}

export async function runClaudeCritique(openAIOutput: unknown) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return openAIOutput;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: buildCritiquePrompt(JSON.stringify(openAIOutput)),
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Claude API error: ${response.status} ${detail}`);
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  const text = payload.content?.find((c) => c.type === 'text')?.text;
  if (!text) {
    throw new Error('Claude no devolvió texto');
  }

  return extractJson(text);
}

export async function analyzeBusiness(url: string, focus: FocusMode) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Falta OPENAI_API_KEY en entorno');
  }

  const openAIOutput = await runOpenAIAnalysis(url, focus);
  const finalOutput = await runClaudeCritique(openAIOutput);
  return analysisOutputSchema.parse(finalOutput);
}
