// const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
    "../stories/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // This is assumed from your CSS, which includes dark:* utilities
  theme: {
    extend: {
      colors: {
        // Primary & Accent Colors
        primary: "#22c55e", // a.k.a. success-300
        "primary-new": "#b7ffd1", // a.k.a. success-100, primaryNew
        primaryNew: "#b7ffd1",
        portage: "#936dff",
        purple: "#936dff",
        orange: "#ff784b",

        // Success Palette
        success: {
          50: "#d9fbe6",
          100: "#b7ffd1",
          200: "#4ade80",
          300: "#22c55e",
          400: "#16a34a",
        },

        // Error & Alerts Palette
        error: {
          50: "#fcdede",
          200: "#ff4747",
          300: "#dd3333",
        },
        alertsErrorBase: "#ff4747",
        alertsWarningBase: "#facd15",
        alertsWarningLight: "#fde047",
        warning: {
          100: "#fde047",
          300: "#eab308",
        },

        // Grayscale & Background Palette (custom 'bgray')
        bgray: {
          50: "#fafafa",
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },

        // Dark Mode Palette
        darkblack: {
          300: "#747681",
          400: "#2a313c",
          500: "#23262b",
          600: "#1d1e24",
          700: "#151515",
        },

        // Secondary & Interface Palette
        secondary: {
          100: "#f2f6ff",
          200: "#d8e3f8",
          300: "#74787b",
          400: "#363b46",
        },
        basicInterface: "#04091e",
        basicSecondary: "#1a202c", // same as bgray-900
        basicWhite: "#747681", // same as darkblack-300
        basicInterface2: "#f5f5f5",
        basicInterface3: "#747681", // same as darkblack-300

        // Miscellaneous Named Colors
        othersOrange: "#ff784b",
        othersTeal: "#2dd4bf",
        lightGray: "#f3f7f8",
        stockColor: "#cbcbcb",
        bamber: {
          50: "#fffbeb",
          500: "#f6a723",
        },
      },
      fontFamily: {
        // Fonts imported in the CSS
        poppins: ["Poppins", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"), // The provided CSS includes styles from this plugin
  ],
};
