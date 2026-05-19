import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crm: {
          bg: "#FDFBF7",
          bg2: "#FAFAFA",
          surface: "#FFFFFF",
          surface2: "#F7F1E7",
          surface3: "#EFE5D2",
          line: "#E7DAC2",
          lineSoft: "#F0E7D6",
          text: "#0D3B22",
          muted: "#4E6658",
          faint: "#8A7D69",
          gold: "#D4AF37",
          teal: "#2BAE9E",
          blue: "#2F6550",
          amber: "#D4AF37",
          violet: "#61498A",
          cyan: "#2A8C95",
          green: "#0D3B22",
          red: "#7A2828",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in-from-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-from-right": "slide-in-from-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
