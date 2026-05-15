import type { FocusMode } from '@/lib/types/analysis';

interface Props {
  url: string;
  focus: FocusMode;
  onUrlChange: (value: string) => void;
  onFocusChange: (value: FocusMode) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function UrlAnalysisForm({ url, focus, onUrlChange, onFocusChange, onSubmit, loading }: Props) {
  return (
    <div className="rounded-2xl border border-lavender/30 bg-panel/70 p-6">
      <h1 className="text-2xl font-semibold text-text">Radar de Agentes IA</h1>
      <p className="mt-2 text-sm text-muted">Diagnóstico técnico-comercial privado para vender agentes IA reales.</p>
      <div className="mt-5 space-y-4">
        <input
          className="w-full rounded-lg border border-cyan/40 bg-bg/80 px-4 py-3 text-sm outline-none focus:border-cyan"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://empresa.com"
        />
        <select
          className="w-full rounded-lg border border-lavender/40 bg-bg/80 px-4 py-3 text-sm outline-none focus:border-lavender"
          value={focus}
          onChange={(e) => onFocusChange(e.target.value as FocusMode)}
        >
          <option>balanceado</option>
          <option>ventas</option>
          <option>operaciones</option>
          <option>experiencia del cliente</option>
        </select>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-cyan to-lavender px-4 py-3 text-sm font-semibold text-bg disabled:opacity-50"
        >
          {loading ? 'Analizando...' : 'Analizar empresa'}
        </button>
      </div>
    </div>
  );
}
