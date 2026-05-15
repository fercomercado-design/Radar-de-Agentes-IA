import { AgentCard } from '@/components/AgentCard';
import { toMarkdown } from '@/lib/markdown/exportAnalysis';
import type { AnalysisResult } from '@/lib/types/analysis';

export function ResultsView({ result }: { result: AnalysisResult }) {
  const downloadMarkdown = () => {
    const blob = new Blob([toMarkdown(result)], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `radar-${result.negocio.nombre.replace(/\s+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-lavender/30 bg-panel/70 p-4">
        <p className="text-lg font-semibold">{result.negocio.nombre}</p>
        <p className="text-sm text-muted">{result.negocio.sector} · {result.negocio.url}</p>
        <p className="mt-2 text-sm">{result.diagnostico.resumenEjecutivo}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadMarkdown} className="rounded bg-lavender/30 px-3 py-2 text-xs">Exportar Markdown</button>
        <button onClick={() => navigator.clipboard.writeText(result.propuestaComercial.mensajeWhatsApp)} className="rounded bg-cyan/20 px-3 py-2 text-xs">Copiar propuesta WhatsApp</button>
        <button onClick={() => navigator.clipboard.writeText(result.propuestaComercial.propuestaFormal)} className="rounded bg-cyan/20 px-3 py-2 text-xs">Copiar propuesta formal</button>
      </div>

      <div className="space-y-3">
        {result.agentes.map((agent) => <AgentCard key={agent.nombre} agent={agent} />)}
      </div>
    </div>
  );
}
