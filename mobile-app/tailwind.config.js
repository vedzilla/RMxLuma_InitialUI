/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#0F172A',
        muted: '#64748B',
        border: '#E5E7EB',
        accent: '#6366F1',
        accentHover: '#4F46E5',
        accentSoft: '#EEF2FF',
        red: '#EF4444',
        redGlow: 'rgba(239, 68, 68, 0.4)',
        redSoft: 'rgba(239, 68, 68, 0.1)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
    },
  },
  plugins: [],
}




