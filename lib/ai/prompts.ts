import type { FocusMode } from '@/lib/types/analysis';

export const buildAnalysisPrompt = (url: string, focus: FocusMode) => `Actúa como consultora senior de agentes IA para ventas B2B.
Analiza la empresa de la URL: ${url}.
Enfoque prioritario: ${focus}.

Debes:
- Investigar el negocio y su operación real.
- Proponer exactamente 3 agentes IA específicos para ese negocio.
- Incluir stack técnico ejecutable en producción (no humo).
- Incluir costos estimados USD.
- Incluir datos que pedir al cliente.
- Incluir propuesta comercial lista para venta.
- Evitar n8n/Make como centro obligatorio salvo que esté plenamente justificado.
- Responder SOLO JSON válido (sin markdown, sin comentarios).
`;

export const buildCritiquePrompt = (openAIJson: string) => `Eres un arquitecto principal de sistemas de agentes IA.
Recibirás un diagnóstico inicial en JSON. Tu tarea es hacer revisión crítica técnica-comercial:
- detectar riesgos operativos,
- validar viabilidad,
- mejorar runtime/herramientas/integraciones,
- reforzar observabilidad y límites de autonomía.

Devuelve SOLO JSON válido final, corrigiendo lo necesario.

JSON inicial:\n${openAIJson}`;
