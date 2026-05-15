import { NextResponse } from 'next/server';
import { analyzeBusiness } from '@/lib/ai/analyze';
import { analysisInputSchema } from '@/lib/schemas/analysis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = analysisInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Entrada inválida', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await analyzeBusiness(parsed.data.url, parsed.data.focus);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[API /analyze]', error);
    return NextResponse.json(
      { error: 'Error interno al analizar la empresa' },
      { status: 500 },
    );
  }
}
