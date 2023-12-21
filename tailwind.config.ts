import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FAFAF8',
        'brand-black': '#1E1E24',
        'brand-gold': '#A6873B',
        'brand-blue': '#243B55',
        'brand-teal': '#30656E',
        'brand-chat-area': '#2C2C34',
        'brand-chat-message': '#3E3E48',
        'brand-additional-elements': '#4A4A56',
      },
      fontFamily: {
        'brand-roboto': ['var(--font-roboto)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ['light', 'dark'], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
export default config;
