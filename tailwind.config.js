/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // If using pages directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // If using app directory
  ],
  theme: {
    extend: {
      // Add custom theme extensions here
      // Example: custom colors, fonts, spacing
      // colors: {
      //   brand: {
      //     light: '#3b82f6',
      //     DEFAULT: '#2563eb',
      //     dark: '#1d4ed8',
      //   },
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "shimmer": "shimmer 4s infinite",
        "pulse-slow": "pulse-slow 4s infinite",
        "float": "float 6s ease-in-out infinite",
        "type-cursor": "type-cursor 0.8s infinite",
        "fade-in": "fade-in 1.2s ease-out forwards",
        "slide-up": "slide-up 1.2s ease-out forwards",
        "slide-down": "slide-down 1.2s ease-out forwards",
        "slide-left": "slide-left 1.2s ease-out forwards",
        "slide-right": "slide-right 1.2s ease-out forwards",
        "zoom-in": "zoom-in 1.2s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: 1,
            boxShadow: "0 0 0 0 var(--primary)",
          },
          "50%": {
            opacity: 0.8,
            boxShadow: "0 0 30px 8px var(--primary)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "type-cursor": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(60px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-down": {
          "0%": { transform: "translateY(-60px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-left": {
          "0%": { transform: "translateX(-60px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-right": {
          "0%": { transform: "translateX(60px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    // Add custom plugin to fix animation issues
    function({ addBase }) {
      addBase({
        // Ensure animation classes apply their animations properly
        '.animate-fade-in': { animation: 'fade-in 1.2s ease-out forwards' },
        '.animate-slide-up': { animation: 'slide-up 1.2s ease-out forwards' },
        '.animate-slide-down': { animation: 'slide-down 1.2s ease-out forwards' },
        '.animate-slide-left': { animation: 'slide-left 1.2s ease-out forwards' },
        '.animate-slide-right': { animation: 'slide-right 1.2s ease-out forwards' },
        '.animate-zoom-in': { animation: 'zoom-in 1.2s ease-out forwards' },
      });
    },
  ],
}; 