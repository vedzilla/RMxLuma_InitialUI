const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
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
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

