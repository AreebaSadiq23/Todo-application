import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          default: "hsl(var(--primary))", // Add default for `primary`
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          default: "hsl(var(--secondary))", // Add default for `secondary`
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          default: "hsl(var(--destructive))", // Add default for `destructive`
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          default: "hsl(var(--muted))", // Add default for `muted`
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          default: "hsl(var(--accent))", // Add default for `accent`
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          default: "hsl(var(--popover))", // Add default for `popover`
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          default: "hsl(var(--card))", // Add default for `card`
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
