import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep institutional palette
        slate: {
          950: '#0a0f1a',
          925: '#0d1321',
          900: '#111827',
        },
        // Accent color - subtle teal for medical/clinical feel
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Warm gray for text
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Institutional navy — Stripe-adapted heading and dark-section color
        ink: {
          50: '#f4f6f9',
          100: '#e5edf5',
          200: '#cdd8e6',
          300: '#9fb0c4',
          400: '#64748d',
          500: '#3f506a',
          600: '#273951',
          700: '#1a2a42',
          800: '#0d1d33',
          900: '#061b31',
          950: '#0b1624',
        },
      },
      boxShadow: {
        'stripe-sm': '0 1px 2px rgba(15, 76, 70, 0.06), 0 1px 3px rgba(6, 27, 49, 0.05)',
        'stripe-md': '0 6px 16px -4px rgba(15, 76, 70, 0.08), 0 2px 6px -2px rgba(6, 27, 49, 0.05)',
        'stripe-lg': '0 30px 45px -30px rgba(15, 76, 70, 0.18), 0 18px 36px -18px rgba(6, 27, 49, 0.12)',
        'stripe-ring': '0 0 0 1px rgba(6, 27, 49, 0.06), 0 1px 2px rgba(6, 27, 49, 0.04)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
