import type { AnalysisOutput } from '@/lib/schemas/analysis';

export type FocusMode = 'balanceado' | 'ventas' | 'operaciones' | 'experiencia del cliente';

export type AnalysisResult = AnalysisOutput;

export interface AnalysisHistoryItem {
  id: string;
  createdAt: string;
  focus: FocusMode;
  url: string;
  result: AnalysisResult;
}
