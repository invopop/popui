/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        base: ['15px', '22px'],
        sm: ['13px', '18.20px'],
        xs: ['11px', '15,62px']
      },
      spacing: {
        1.25: '5px',
        18: '4.5rem'
      },
      borderRadius: {
        xl: '0.625rem',
        '2xl': '12px'
      },
      colors: {
        accent: {
          400: 'rgba(22, 153, 88, 0.4)',
          500: '#169958'
        },
        danger: {
          500: '#EC4E46'
        },
        neutral: {
          50: '#FAFBFB',
          100: '#F3F5F5',
          200: '#E9EBEB',
          300: '#CCCECE',
          400: '#A5A7A7',
          500: '#7E7F7F',
          800: '#0A0A0A'
        },
        sherwood: {
          500: '#194136'
        },
        white: {
          5: 'rgba(255, 255, 255, 0.05)',
          10: 'rgba(255, 255, 255, 0.1)',
          70: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  },
  plugins: []
}
