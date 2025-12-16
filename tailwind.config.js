/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      boxShadow: {
        DEFAULT: '0 4px 14px rgba(15, 23, 42, 0.06)',
        md: '0 6px 24px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

