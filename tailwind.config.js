/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FF69B4', // Hot Pink (Keep for accents)
        'deep-night': '#0F172A', // Midnight Blue (Primary BG)
        'velvet-purple': '#312E81', // Deep Indigo/Purple
        'moonlight': '#F8FAFC', // Soft White Text
        'starlight-gold': '#FDB813', // Gold Accents
        'vintage-red': '#D34E4E',
        'vintage-cream': '#F9E7B2',
        'vintage-gold': '#DDC57A',
        'vintage-brown': '#CE7E5A',
        'soft-cloud': '#EFF6FF', // Keep for compatibility
        'bunny-white': '#FFFFFF',
        'deep-text': '#2D1B4E', // Keep for compatibility
        'accent-blue': '#38BDF8', 
        'accent-yellow': '#FDE047',
        'cream': '#FFF7ED',
        'candy-red': '#FF4757',
        'candy-green': '#2ED573',
      },
      fontFamily: {
        'cute': ['"Quicksand"', 'sans-serif'], // Rounded font
        'romantic-serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'bounce-soft': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
