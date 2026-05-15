import { z } from 'zod';

export const focusSchema = z.enum(['balanceado', 'ventas', 'operaciones', 'experiencia del cliente']);

export const analysisInputSchema = z.object({
  url: z.string().url(),
  focus: focusSchema,
});

const usdRangeSchema = z
  .object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
  })
  .refine((v) => v.max >= v.min, { message: 'max debe ser mayor o igual a min' });

const herramientaSchema = z.object({
  nombre: z.string(),
  funcion: z.string(),
  accionesPermitidas: z.array(z.string()).min(1),
  permisosRequeridos: z.array(z.enum(['lectura', 'escritura', 'envío', 'aprobación humana'])).min(1),
  requiereAprobacionHumana: z.boolean(),
});

const agenteSchema = z.object({
  nombre: z.string(),
  tipo: z.string(),
  problemaQueResuelve: z.string(),
  impacto: z.enum(['Crítico', 'Alto', 'Medio']),
  maximoImpacto: z.boolean(),
  descripcion: z.string(),
  capacidades: z.array(z.string()).min(1),
  beneficio: z.string(),
  businessCase: z.object({
    procesoOptimizado: z.string(),
    costoManualMensualUSD: z.number().nonnegative(),
    ahorroAnualUSD: z.number().nonnegative(),
    valorPVPSugeridoMensualUSD: z.number().nonnegative(),
    multiplicadorROI: z.number().nonnegative(),
    horasSemanalesAhorradas: z.number().nonnegative(),
  }),
  stackEjecucionAgente: z.object({
    tipo: z.enum(['Agente real', 'Automatización asistida', 'Híbrido']),
    runtimeRecomendado: z.enum([
      'OpenAI Agents SDK',
      'OpenAI Responses API con function calling',
      'Claude Managed Agents',
      'Claude Agent SDK',
      'Backend propio',
      'Híbrido',
    ]),
    porQueEseRuntime: z.string(),
    modeloSugerido: z.string(),
    herramientasDelAgente: z.array(herramientaSchema).min(1),
    canalesEntrada: z.array(z.string()).min(1),
    canalesSalida: z.array(z.string()).min(1),
    memoria: z.object({
      queDebeRecordar: z.array(z.string()).min(1),
      dondeGuardar: z.enum(['Supabase', 'Postgres', 'vector store', 'CRM', 'Google Sheets', 'memoria del runtime', 'archivos']),
    }),
    baseConocimiento: z.object({
      fuentes: z.array(z.string()).min(1),
      actualizacion: z.enum(['manual', 'semanal', 'automática']),
    }),
    triggers: z.array(z.string()).min(1),
    accionesAutonomasPermitidas: z.array(z.string()).min(1),
    accionesQueRequierenAprobacion: z.array(z.string()).min(1),
    integracionesNecesarias: z.array(z.string()).min(1),
    datosNecesariosDelCliente: z.array(z.string()).min(1),
    observabilidad: z.array(z.string()).min(1),
    riesgos: z.array(z.string()).min(1),
    versionMVP: z.string(),
    versionProduccion: z.string(),
    costoMensualEstimadoUSD: usdRangeSchema,
    dificultadTecnica: z.enum(['Baja', 'Media', 'Alta']),
    tiempoEstimadoImplementacion: z.string(),
  }),
  fasesImplementacion: z.array(z.string()).min(1),
  systemPrompt: z.string(),
});

export const analysisOutputSchema = z.object({
  negocio: z.object({
    nombre: z.string(),
    sector: z.string(),
    descripcion: z.string(),
    ubicacion: z.string().nullable(),
    url: z.string().url(),
  }),
  diagnostico: z.object({
    resumenEjecutivo: z.string(),
    problemasDetectados: z.array(z.string()).min(1),
    oportunidadesIA: z.array(z.string()).min(1),
    nivelMadurezDigital: z.enum(['Bajo', 'Medio', 'Alto']),
    probabilidadDeVenta: z.enum(['Baja', 'Media', 'Alta']),
    razonProbabilidadDeVenta: z.string(),
  }),
  agentes: z.array(agenteSchema).length(3),
  propuestaComercial: z.object({
    mensajeWhatsApp: z.string(),
    propuestaFormal: z.string(),
    rangoInversionSugeridoUSD: usdRangeSchema,
    primerPasoRecomendado: z.string(),
  }),
});

export type AnalysisOutput = z.infer<typeof analysisOutputSchema>;
