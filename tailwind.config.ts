import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#87CEEB',
        'primary-green': '#98D8C8',
        'primary-purple': '#B19CD9',
        'primary-orange': '#FFB347',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F9FAFB',
        'border-primary': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}

export default config