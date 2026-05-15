import type { AnalysisHistoryItem } from '@/lib/types/analysis';

const KEY = 'radar-agentes-ia-history';

export function getHistory(): AnalysisHistoryItem[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AnalysisHistoryItem[];
  } catch {
    return [];
  }
}

export function saveHistory(item: AnalysisHistoryItem): AnalysisHistoryItem[] {
  const current = getHistory();
  const next = [item, ...current].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
