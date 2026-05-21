/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#6ed6f2",
        "primary-dark": "#00687b",
        "primary-light": "#e0f7fd",
        "primary-container": "#e0f7fd",
        "on-primary-container": "#00687b",
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
