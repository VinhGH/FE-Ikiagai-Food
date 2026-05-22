/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#2D8A6B",
        "primary-dark": "#0F5B47",
        "primary-light": "#F0FDF4",
        "primary-container": "#E8F5E9",
        "on-primary-container": "#0F5B47",
        "surface-container-low": "#F9FAFB",
        "outline-variant": "#E5E7EB",
        "outline": "#9CA3AF",
        "on-surface": "#111827",
        "on-surface-variant": "#4B5563",
        "background": "#F3F4F6",
        "surface": "#FFFFFF",
        "surface-container-high": "#E5E7EB",
      },
    },
  },
  plugins: [],
}
