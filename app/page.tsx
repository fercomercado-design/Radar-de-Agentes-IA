'use client';

import { useEffect, useState } from 'react';
import { LoadingState } from '@/components/LoadingState';
import { ResultsView } from '@/components/ResultsView';
import { UrlAnalysisForm } from '@/components/UrlAnalysisForm';
import { getHistory, saveHistory } from '@/lib/utils/history';
import type { AnalysisHistoryItem, AnalysisResult, FocusMode } from '@/lib/types/analysis';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [focus, setFocus] = useState<FocusMode>('balanceado');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setHistory(getHistory()), []);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, focus }),
      });

      if (!res.ok) throw new Error('No se pudo analizar la URL.');

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
      const item: AnalysisHistoryItem = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        url,
        focus,
        result: data,
      };
      setHistory(saveHistory(item));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid-bg bg-grid p-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <UrlAnalysisForm
            url={url}
            focus={focus}
            onUrlChange={setUrl}
            onFocusChange={setFocus}
            onSubmit={onSubmit}
            loading={loading}
          />
          <div className="rounded-xl border border-lavender/20 bg-panel/70 p-4 text-sm">
            <p className="mb-2 font-medium">Historial local</p>
            <div className="space-y-2">
              {history.map((h) => (
                <button key={h.id} className="w-full rounded border border-cyan/15 p-2 text-left text-xs" onClick={() => setResult(h.result)}>
                  <p className="truncate">{h.result.negocio.nombre}</p>
                  <p className="truncate text-muted">{h.url} · {h.focus}</p>
                </button>
              ))}
              {history.length === 0 && <p className="text-xs text-muted">Sin análisis guardados todavía.</p>}
            </div>
          </div>
        </div>
        <section>
          {loading && <LoadingState />}
          {error && <p className="rounded bg-red-950/40 p-3 text-sm text-red-200">{error}</p>}
          {!loading && !result && !error && (
            <div className="rounded-2xl border border-cyan/20 bg-panel/50 p-8 text-sm text-muted">
              Ingresá una URL para recibir diagnóstico técnico-comercial completo con 3 agentes IA accionables.
            </div>
          )}
          {!loading && result && <ResultsView result={result} />}
        </section>
      </div>
    </main>
  );
}
