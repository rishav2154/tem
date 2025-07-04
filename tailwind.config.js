/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        neon: {
          cyan: '#00f5ff',
          purple: '#ff00ff',
          yellow: '#ffff00',
          green: '#00ff00',
          pink: '#ff1493',
          orange: '#ff4500',
        },
        cosmic: {
          dark: '#0a0a0a',
          purple: '#1a0033',
          blue: '#000033',
          pink: '#330011',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 15s ease infinite',
        'quantum-glow': 'quantum-glow 3s ease-in-out infinite alternate',
        'holographic': 'holographic 4s ease-in-out infinite',
        'cosmic-float': 'cosmic-float 10s linear infinite',
        'neon-rotate': 'neon-rotate 3s linear infinite',
        'matrix-fall': 'matrix-fall 3s linear infinite',
        'quantum-pulse': 'quantum-pulse 2s ease-in-out infinite',
        'interdimensional-shift': 'interdimensional-shift 5s ease-in-out infinite',
        'cosmic-rotate': 'cosmic-rotate 4s linear infinite',
        'hyperspace-jump': 'hyperspace-jump 0.5s ease-out',
        'cosmic-grid-move': 'cosmic-grid-move 20s linear infinite',
        'skeleton-loading': 'skeleton-loading 1.5s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'quantum-glow': {
          'from': {
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
          },
          'to': {
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(168, 85, 247, 0.6), 0 0 120px rgba(236, 72, 153, 0.4)',
          },
        },
        holographic: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'cosmic-float': {
          '0%': {
            transform: 'translateY(100vh) rotate(0deg)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100vh) rotate(360deg)',
            opacity: '0',
          },
        },
        'neon-rotate': {
          '0%': {
            background: 'linear-gradient(0deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
          },
          '25%': {
            background: 'linear-gradient(90deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
          },
          '50%': {
            background: 'linear-gradient(180deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
          },
          '75%': {
            background: 'linear-gradient(270deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
          },
          '100%': {
            background: 'linear-gradient(360deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
          },
        },
        'matrix-fall': {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        'quantum-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.7)',
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 20px rgba(6, 182, 212, 0)',
          },
        },
        'interdimensional-shift': {
          '0%, 100%': {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': {
            transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(10deg)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': {
            transform: 'perspective(1000px) rotateX(-5deg) rotateY(5deg)',
            filter: 'hue-rotate(270deg)',
          },
        },
        'cosmic-rotate': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'hyperspace-jump': {
          '0%': {
            transform: 'scale(1) translateZ(0)',
            filter: 'blur(0px)',
          },
          '50%': {
            transform: 'scale(1.1) translateZ(100px)',
            filter: 'blur(2px)',
          },
          '100%': {
            transform: 'scale(1) translateZ(0)',
            filter: 'blur(0px)',
          },
        },
        'cosmic-grid-move': {
          '0%': {
            backgroundPosition: '0 0',
          },
          '100%': {
            backgroundPosition: '50px 50px',
          },
        },
        'skeleton-loading': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(255, 0, 255, 0.5)',
        'neon-yellow': '0 0 20px rgba(255, 255, 0, 0.5)',
        'cosmic': '0 0 50px rgba(0, 245, 255, 0.3), 0 0 100px rgba(255, 0, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cosmic-gradient': 'linear-gradient(45deg, #000033, #1a0033, #330011, #000033)',
        'holographic': 'linear-gradient(45deg, #00f5ff, #ff00ff, #ffff00, #00ff00)',
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};