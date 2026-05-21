/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#00687b",
        "primary-container": "#6ed6f2",
        "on-primary-container": "#005c6d",
        "surface-container-low": "#f2f4f6",
        "outline-variant": "#bdc8cd",
        "outline": "#6e797d",
        "on-surface": "#191c1e",
        "on-surface-variant": "#3e484c",
        "background": "#f7f9fb",
        "surface": "#f7f9fb",
        "surface-container-high": "#e6e8ea",
        "bh-primary": "#6ed6f2",
        "bh-primary-hover": "#5bc2dd",
        "bh-dark": "#191c1e",
        "bh-light-card": "#f2f4f6",
        "bh-gray": "#6e797d",
        "bh-outline": "#bdc8cd",
      },
    },
  },
  plugins: [],
}
