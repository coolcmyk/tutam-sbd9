/** @type {import('tailwindcss').Config} */
const shadcnConfig = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        anime: ['"Nunito"', "sans-serif"],
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        pop: "pop 0.3s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "bounce-once": "bounceOnce 0.6s ease-in-out",
        pulse: "pulse 1.5s infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceOnce: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
          "100%": { transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        neon: '0 0 5px theme("colors.sakura.400"), 0 0 20px theme("colors.sakura.600")',
        "inner-glow": 'inset 0 0 15px theme("colors.sakura.500")',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        sakura: {
          100: "#FFE6F2",
          200: "#FFD1E6",
          300: "#FFADD6",
          400: "#FF85C6",
          500: "#FF5CAB",
          600: "#EA4C9E",
          700: "#C13B82",
          800: "#972C64",
          900: "#6A1C46",
        },
        night: {
          100: "#D0D1E6",
          200: "#A1A6D6",
          300: "#727BC6",
          400: "#5358AD",
          500: "#3D3D8F",
          600: "#2F2F72",
          700: "#232356",
          800: "#18183A",
          900: "#0E0E1F",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

module.exports = {
  ...shadcnConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
}
