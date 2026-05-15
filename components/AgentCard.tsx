'use client';

import { useState } from 'react';
import type { AnalysisResult } from '@/lib/types/analysis';

export function AgentCard({ agent }: { agent: AnalysisResult['agentes'][number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-cyan/20 bg-panel/70 p-4">
      <button className="flex w-full items-center justify-between" onClick={() => setOpen((v) => !v)}>
        <div>
          <p className="font-semibold text-cyan">{agent.nombre}</p>
          <p className="text-xs text-muted">{agent.tipo} · Impacto {agent.impacto}</p>
        </div>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-3 text-sm text-text">
          <p><strong>Resumen comercial:</strong> {agent.descripcion}</p>
          <p><strong>Business case:</strong> Ahorro anual USD {agent.businessCase.ahorroAnualUSD} · ROI {agent.businessCase.multiplicadorROI}x</p>
          <p><strong>Stack:</strong> {agent.stackEjecucionAgente.runtimeRecomendado} ({agent.stackEjecucionAgente.modeloSugerido})</p>
          <p><strong>Herramientas:</strong> {agent.stackEjecucionAgente.herramientasDelAgente.map((h) => h.nombre).join(', ')}</p>
          <p><strong>Datos necesarios:</strong> {agent.stackEjecucionAgente.datosNecesariosDelCliente.join(', ')}</p>
          <p><strong>MVP vs Producción:</strong> {agent.stackEjecucionAgente.versionMVP} / {agent.stackEjecucionAgente.versionProduccion}</p>
          <p><strong>Riesgos:</strong> {agent.stackEjecucionAgente.riesgos.join('; ')}</p>
          <div>
            <p className="mb-1"><strong>System prompt</strong></p>
            <pre className="overflow-auto rounded bg-bg/70 p-2 text-xs">{agent.systemPrompt}</pre>
            <button className="mt-2 rounded bg-cyan/20 px-3 py-1 text-xs" onClick={() => navigator.clipboard.writeText(agent.systemPrompt)}>Copiar system prompt</button>
          </div>
        </div>
      )}
    </div>
  );
}
