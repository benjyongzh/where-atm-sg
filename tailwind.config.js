/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  daisyui: {
    themes: ["cupcake"],
  } /* 
  darkMode: "class" 
  theme: {
    extend: {
      colors: {
        textlightmode: {
          light: "#466476",
          DEFAULT: "#24475c", //original
          dark: "#19303d",
        },
        textdarkmode: {
          light: "#98b3c2",
          DEFAULT: "#7f95a3", //original
          dark: "#50748a",
        },

        primarylightmode: {
          light: "#27d1ba",
          DEFAULT: "#22b3a2",
          dark: "#3b998e",
        },

        primarydarkmode: {
          light: "#20bfb4",
          DEFAULT: "#1BA098", //original
          dark: "#328781",
        },

        secondarylightmode: {
          light: "#a4cce8",
          DEFAULT: "#90b4ce",
          dark: "#5a8fb5",
        },

        secondarydarkmode: {
          light: "#0f344d",
          DEFAULT: "#001f33",
          dark: "#00101a",
        },

        accentlightmode: {
          light: "#7a5118",
          DEFAULT: "#5c3e14",
          dark: "#422701",
        },

        accentdarkmode: {
          light: "#f7cb9d",
          DEFAULT: "#DEB992", //original
          dark: "#c5915a",
        },

        bglightmode: {
          light: "#d8eefe",
          dark: "#95c4e5",
        },

        bgdarkmode: {
          light: "#152c3c",
          dark: "#051622", //original
        },
      },
    }, 
  },*/,
  plugins: [require("daisyui")],
};
