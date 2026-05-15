import type { AnalysisResult } from '@/lib/types/analysis';

export function toMarkdown(data: AnalysisResult): string {
  const agentMd = data.agentes
    .map((a, i) => `## Agente ${i + 1}: ${a.nombre}\n\n` +
      `- **Tipo:** ${a.tipo}\n` +
      `- **Impacto:** ${a.impacto}\n` +
      `- **Problema que resuelve:** ${a.problemaQueResuelve}\n` +
      `- **Beneficio:** ${a.beneficio}\n\n` +
      `### Business Case\n` +
      `- Proceso: ${a.businessCase.procesoOptimizado}\n` +
      `- Costo manual mensual: USD ${a.businessCase.costoManualMensualUSD}\n` +
      `- Ahorro anual: USD ${a.businessCase.ahorroAnualUSD}\n` +
      `- PVP sugerido mensual: USD ${a.businessCase.valorPVPSugeridoMensualUSD}\n` +
      `- ROI: ${a.businessCase.multiplicadorROI}x\n\n` +
      `### Stack\n` +
      `- Runtime: ${a.stackEjecucionAgente.runtimeRecomendado}\n` +
      `- Modelo: ${a.stackEjecucionAgente.modeloSugerido}\n` +
      `- Integraciones: ${a.stackEjecucionAgente.integracionesNecesarias.join(', ')}\n` +
      `- Riesgos: ${a.stackEjecucionAgente.riesgos.join('; ')}\n\n` +
      `### System Prompt\n\n\
\
\
${a.systemPrompt}\n\
\
\
`)
    .join('\n\n');

  return `# Radar de Agentes IA - ${data.negocio.nombre}\n\n` +
    `- URL: ${data.negocio.url}\n` +
    `- Sector: ${data.negocio.sector}\n\n` +
    `## Diagnóstico\n\n${data.diagnostico.resumenEjecutivo}\n\n` +
    `### Problemas detectados\n${data.diagnostico.problemasDetectados.map((p) => `- ${p}`).join('\n')}\n\n` +
    `### Oportunidades IA\n${data.diagnostico.oportunidadesIA.map((o) => `- ${o}`).join('\n')}\n\n` +
    `${agentMd}\n\n` +
    `## Propuesta Comercial\n\n` +
    `### WhatsApp\n${data.propuestaComercial.mensajeWhatsApp}\n\n` +
    `### Propuesta Formal\n${data.propuestaComercial.propuestaFormal}\n`;
}
