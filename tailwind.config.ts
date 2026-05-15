import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070A14',
        panel: '#11162B',
        cyan: '#35E2FF',
        lavender: '#B99DFF',
        text: '#E5E9FF',
        muted: '#95A0CC',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(53,226,255,.25), 0 8px 35px rgba(53,226,255,.14)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(185,157,255,.2) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
