const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

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
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
				"grid-pattern": `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(0, 0%25, 100%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
				"grid-pattern-light": `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(215, 16%25, 47%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"marquee": "marquee 60s linear infinite",
				"marquee2": "marquee2 60s linear infinite",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0%",
					},
					"75%": {
						opacity: "0%",
					},
					"100%": {
						opacity: "100%",
					},
				},
				"fade-left": {
					"0%": {
						transform: "translateX(100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				"fade-right": {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0%",
					},

					"30%": {
						transform: "translateX(0%)",
						opacity: "100%",
					},
					"100%": {
						opacity: "0%",
					},
				},
				title: {
					"0%": {
						"line-height": "0%",
						"letter-spacing": "0.25em",
						opacity: "0",
					},
					"25%": {
						"line-height": "0%",
						opacity: "0%",
					},
					"80%": {
						opacity: "100%",
					},

					"100%": {
						"line-height": "100%",
						opacity: "100%",
					},
				},
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
