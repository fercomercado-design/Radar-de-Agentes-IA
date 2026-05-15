import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radar de Agentes IA',
  description: 'Plataforma privada para diagnóstico técnico-comercial de agentes IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
