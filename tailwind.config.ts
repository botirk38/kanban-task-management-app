import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans'],
      },
      fontSize: {
        'xl': ['24px', '30px'],  // 24px font-size, 30px line-height
        'l': ['18px', '23px'],
        'm': ['15px', '19px'],
        's': ['12px', '15px'],
        'body-l': ['13px', '23px'],  // Assuming this is for a general body text
      },
      fontWeight: {
        'bold': 700 as any ,
        'medium': 500 as any,
      },

      colors: {
        'purple-dark': '#635FC7',
        'purple-light': '#A8A4FF',
        'blue-dark': '#000112',
        'blue-mid': '#20212C',
        'blue-gray': '#2B2C37',
        'blue-gray-light': '#3E3F4E',
        'blue-grayish': '#828FA3',
        'blue-pale': '#E4EBFA',
        'blue-soft': '#F4F7FD',
        white: '#FFFFFF',
        'red-bright': '#EA5555',
        'red-light': '#FF9898',
        'green': '#00C48C',
      },

      letterSpacing: {
        tightest: '-0.24px',
      },
    },
  }
  ,
  plugins: [],
}
export default config
