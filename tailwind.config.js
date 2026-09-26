/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exclusive Palette from User Image (#FFE897 & #583714)
        gold: {
          light: '#FFE897',    // Light Warm Metallic Gold
          DEFAULT: '#FFE897',  // Primary Light Gold
          mid: '#C59A45',      // Warm Metallic Amber-Gold
          dark: '#583714',     // Rich Deep Golden Brown
          deep: '#3A230B',     // Deepest Espresso Gold
          canvas: '#FAF5E6',   // Soft Light Golden Cream Background
          card: '#FFFDF5',     // Light Card Surface
          subtle: '#F7EED3',   // Input & Pill Surface
          border: '#E6D39D',   // Warm Gold Border Tint
        },
        // Mapped Theme Colors for Complete System Consistency
        dusk: {
          rose: '#583714',
          violet: '#583714',
          lavender: '#FFE897',
          peach: '#FFE897',
          dark: '#583714',
          darker: '#3A230B',
          canvas: '#FAF5E6',
          card: '#FFFDF5',
          subtle: '#F7EED3',
          border: '#E6D39D',
        },
        champagne: {
          DEFAULT: '#FFE897',
          light: '#FFFDF5',
          dark: '#583714',
          border: '#E6D39D'
        },
        bronze: {
          DEFAULT: '#583714',
          light: '#FFE897',
          mid: '#C59A45',
          dark: '#3A230B',
          hover: '#42280C',
          bg: '#FAF5E6'
        },
        cream: {
          DEFAULT: '#FAF5E6',
          card: '#FFFDF5',
          muted: '#F7EED3',
          border: '#E6D39D'
        },
        beige: {
          canvas: '#FAF5E6',
          card: '#FFFDF5',
          subtle: '#F7EED3',
          border: '#E6D39D'
        }
      },
      fontFamily: {
        serif: ['"Radley"', 'Georgia', 'serif'],
        radley: ['"Radley"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 15px 35px -5px rgba(88, 55, 20, 0.15), 0 5px 15px -3px rgba(255, 232, 151, 0.3)',
        'gold-glow': '0 0 25px rgba(255, 232, 151, 0.5)',
        'dusk-glow': '0 0 25px rgba(255, 232, 151, 0.4)',
        'rose-glow': '0 0 25px rgba(88, 55, 20, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

