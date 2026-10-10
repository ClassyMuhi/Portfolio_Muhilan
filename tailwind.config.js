/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#070b0a',
        'base-100': '#0d1412',
        'base-200': '#111916',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          violet: '#818CF8',
          cyan: '#22D3EE',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'rgba(255,255,255,0.08)',
          medium: 'rgba(255,255,255,0.15)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(to right, rgba(7,11,10,0.92) 0%, rgba(7,11,10,0.55) 50%, rgba(7,11,10,0.2) 100%)',
        'hero-bottom': 'linear-gradient(to top, #070b0a 0%, transparent 40%)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glass':       '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-lg':    '0 12px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glow-primary':  '0 0 30px rgba(59,130,246,0.35), 0 0 60px rgba(59,130,246,0.15)',
        'glow-violet':   '0 0 30px rgba(129,140,248,0.35), 0 0 60px rgba(129,140,248,0.15)',
        'glow-secondary':'0 0 30px rgba(96,165,250,0.25)',
        'card-hover':    '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.12)',
        'btn-glow':      '0 0 28px rgba(59,130,246,0.5), 0 0 60px rgba(129,140,248,0.25)',
      },
    },
  },
  plugins: [],
};
