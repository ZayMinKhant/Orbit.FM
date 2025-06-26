/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          medium: '#1a1a2e',
          light: '#16213e',
          accent: '#0f3460',
          glow: '#00d4ff'
        },
        planet: {
          echo: '#4a90e2',
          corefire: '#ff6b6b',
          void: '#2c3e50',
          moon: '#f39c12',
          earth: '#27ae60',
          reflecta: '#9b59b6'
        }
      },
      fontFamily: {
        'space': ['Orbitron', 'monospace'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite'
      }
    },
  },
  plugins: [],
} 