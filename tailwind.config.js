/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: [
    "./src/**/*.{astro,js,ts,jsx,tsx}", // scan Astro + React + JS/TS files
  ],

  theme: {
    extend: {
      maxWidth: {
        'custom-narrower': '46rem',
        'custom-narrow': '56rem',
        'custom-standard': '76rem',
      },
      fontSize: {
        'fs-xs': '0.75rem',  // 14px
        'fs-sm': '0.875rem',  // 14px
        'fs-base': '1rem',       // 16px
        'fs-lg': '1.125rem',     // 18px
        'fs-xl': '1.25rem',      // 20px
        'fs-2xl': '1.5rem',      // 24px
        'fs-3xl': '1.875rem',      // 30px
      },
      backgroundImage: {
        'custom-gradient-indigo': 'linear-gradient(180deg, #000000, #03031c, #000000)',
        'custom-gradient-violet': 'linear-gradient(180deg, #000000, #1d0737, #000000)',
        'custom-gradient-navy': 'linear-gradient(180deg, #000000, #051f34, #000000)',
        
        'custom-gradient-diagonal-indigo': 'linear-gradient(135deg, #1d1b53, #03031c)',
        'custom-gradient-diagonal-violet': 'linear-gradient(135deg, #321651, #1d0737)',
        'custom-gradient-diagonal-navy': 'linear-gradient(135deg, #15324d, #051f34)',
        
        'custom-radial-gradient-indigo': "radial-gradient(ellipse at center, #0c0b38 0%, #0c0b38 40%, rgba(0,0,0,0) 70% )",
        'custom-radial-gradient-violet': "radial-gradient(ellipse at center, #1d0737 0%, #1d0737 40%, rgba(0,0,0,0) 70% )",
        'custom-radial-gradient-navy': "radial-gradient(ellipse at center, #051f34 0%, #051f34 40%, rgba(0,0,0,0) 70% )",
      },
      colors: {
        // Base colors
        'base-dark': '#000',
        'base-dark-light': '#222',
        'base-dark-lighter': '#333',
        'base-bright': '#fff',

        'base-dark-blue': '#415274',

        'base-red': '#cb5353',
        'base-red-darker': '#892929',
        'base-yellow': '#cbaf53',
        'base-yellow-darker': '#b09435',
        
        'accent-coral': '#ef776e',
        
        // Sky-blue
        "sky-blue-light":"#5cb0ff",

        // Indigo Palette
        "indigo-lightest": "#c8c6ff",
        "indigo-lighter": "#4e4c86",
        "indigo-light": "#32306d",
        "indigo-base": "#1d1b53",
        "indigo-dark": "#0c0b38",

        // Violet Palette
        "violet-lightest": "#d3c5e2",
        "violet-lighter": "#614582",
        "violet-light": "#472a6a",
        "violet-base": "#321651",
        "violet-dark": "#1d0737",

        // Navy Palette
        "navy-lightest": "#557fa5",
        "navy-lighter": "#41617e",
        "navy-light": "#294866",
        "navy-base": "#15324d",
        "navy-dark": "#051f34",

      },
      spacing: {
        128: "32rem",
        "navDouble": "5rem",
        "navSingle": "2.5rem",

        "pxPage": "2rem",
        "pyPage": "2rem",
        "titleField": "6rem",

        "pySection": "6rem",
        "pyLongSectionTop": "10rem",
        "pyLongSectionBottom": "5rem",

      },
      
      fontFamily: {
        // Default sans font for body text
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],

        // New custom font
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
      },

    },
    screens: {
      sm: '640px',
      md: '900px', // changed from 768px
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    }
  },
  safelist: [
    //base colors
    "bg-base-dark", "bg-base-bright", 
    "text-base-dark", "text-base-dark-light", "text-base-dark-lighter",
    "text-base-bright",
    "text-base-dark-blue", "bg-base-dark-blue",
    
    // Radial
    "bg-custom-radial-gradient-navy",
    "text-custom-radial-gradient-navy",

    'bg-custom-radial-gradient-violet',
    'text-custom-radial-gradient-violet',

    // Sky blue
    "text-sky-blue-light", "bg-sky-blue-light",
    // Indigo
    "text-indigo-lightest", "text-indigo-lighter", "text-indigo-light", "text-indigo-base", "text-indigo-dark",
    "bg-indigo-lightest", "bg-indigo-lighter", "bg-indigo-light", "bg-indigo-base", "bg-indigo-dark",

    // Violet
    "text-violet-lightest", "text-violet-lighter", "text-violet-light", "text-violet-base", "text-violet-dark",
    "bg-violet-lightest", "bg-violet-lighter", "bg-violet-light", "bg-violet-base", "bg-violet-dark",

    // Navy
    "text-navy-lightest", "text-navy-lighter", "text-navy-light", "text-navy-base", "text-navy-dark",
    "bg-navy-lightest", "bg-navy-lighter", "bg-navy-light", "bg-navy-base", "bg-navy-dark",


    //Max Width Pages
    'max-w-custom-narrow', 'max-w-custom-standard',
    
    // Spacing
    'px-pxPage', 'pl-pxPage', 'pr-pxPage',
    
    'py-pyPage', 'pt-pyPage', 'pb-pyPage',
    'py-pySection', 'pt-pySection', 'pb-pySection',
    
    'text-sm', 'text-xs', 'text-lg', 'text-xl', 'text-gray-400',
    
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
