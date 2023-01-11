module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/sections/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D900FF",
        darkPrimary: "#c400ff",
        dark: "#0E0741",
        white: "#FFFFFF",
        gray: "#ededed",
        darkGray: "#616161",
        red: "#F44336",

        // Overlay
        overlay: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
