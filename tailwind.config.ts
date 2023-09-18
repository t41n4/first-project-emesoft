/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GeneralSans-Variable", "sans"],
        "sans-variable": ["GeneralSans-Variable", "sans"],
        "sans-variable-italic": ["GeneralSans-VariableItalic", "sans"],
        "sans-extralight": ["GeneralSans-Extralight", "sans"],
        "sans-extralight-italic": ["GeneralSans-ExtralightItalic", "sans"],
        "sans-light": ["GeneralSans-Light", "sans"],
        "sans-light-italic": ["GeneralSans-LightItalic", "sans"],
        "sans-regular": ["GeneralSans-Regular", "sans"],
        "sans-italic": ["GeneralSans-Italic", "sans"],
        "sans-medium": ["GeneralSans-Medium", "sans"],
        "sans-medium-italic": ["GeneralSans-MediumItalic", "sans"],
        "sans-semibold": ["GeneralSans-Semibold", "sans"],
        "sans-semibold-italic": ["GeneralSans-SemiboldItalic", "sans"],
        "sans-bold": ["GeneralSans-Bold", "sans"],
        "sans-bold-italic": ["GeneralSans-BoldItalic", "sans"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
