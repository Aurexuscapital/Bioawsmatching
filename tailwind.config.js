/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#3B82F6'
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#34D399'
        },
        warn: {
          DEFAULT: '#F59E0B',
          dark: '#FBBF24'
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#F87171'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B'
        },
        bgc: {
          light: '#F9FAFB',
          dark: '#0F172A'
        },
        txt: {
          light: '#111827',
          dark: '#F9FAFB'
        },
        brd: {
          light: '#E5E7EB',
          dark: '#334155'
        }
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }
    }
  },
  plugins: []
};
