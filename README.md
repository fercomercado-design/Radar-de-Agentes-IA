# Radar de Agentes IA

Aplicación privada para analizar URLs de empresas reales y generar un diagnóstico técnico-comercial para vender servicios de agentes IA.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Zod
- OpenAI Responses API (análisis principal)
- Claude API (segunda revisión crítica opcional)

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Completar:

- `OPENAI_API_KEY`: obligatoria para analizar.
- `ANTHROPIC_API_KEY`: opcional, activa revisión crítica con Claude.

## Ejecutar en local

```bash
npm run dev
```

Abrir `http://localhost:3000`.

## Seguridad

- Las API keys se usan únicamente en backend (`app/api/analyze/route.ts`).
- El frontend nunca llama directo a OpenAI o Claude.

## Endpoint

`POST /api/analyze`

Body:

```json
{
  "url": "https://empresa.com",
  "focus": "balanceado"
}
```

Respuesta: JSON validado por Zod según `lib/schemas/analysis.ts`.

## Primera entrega incluida

- Pantalla inicial dark premium cyan/lavanda.
- Formulario con URL + selector de enfoque.
- Estado de carga.
- Vista de resultados con tarjetas desplegables por agente.
- Copiar propuesta WhatsApp/formal.
- Copiar system prompt por agente.
- Exportación completa a Markdown.
- Historial local (`localStorage`).
- Endpoint `/api/analyze` con validación y orquestación OpenAI + Claude.


## Estado de integraciones IA

- **OpenAI**: integración activa en backend (`lib/ai/analyze.ts`) usando Responses API con `web_search_preview`.
- **Claude**: integración preparada y funcional vía HTTP a `https://api.anthropic.com/v1/messages` en backend; se ejecuta solo si existe `ANTHROPIC_API_KEY`.
- Si `ANTHROPIC_API_KEY` no está configurada, la app devuelve el resultado de OpenAI validado por Zod (fallback controlado).
- No hay mocks en frontend ni backend para estas claves; las llamadas reales se hacen únicamente del lado servidor.
