/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#93C5FD',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#F8FAFC',
          dark: '#0F172A',
          cardDark: '#1E293B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
          light: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
};
