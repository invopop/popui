export default {
  extend: {
    fontSize: {
      xl: ['20px', '28px'],
      lg: ['16px', '24px'],
      base: ['14px', '20px'],
      sm: ['12px', '16px']
    },

    spacing: {
      1.25: '5px',
      18: '4.5rem',
      128: '32rem'
    },

    borderRadius: {
      xl: '0.625rem',
      '2xl': '12px'
    },

    minWidth: {
      dropdown: '175px'
    },

    colors: {
      workspace: {
        accent: {
          DEFAULT: 'var(--workspace-accent-color, #169958)',
          50: 'color-mix(in lab, transparent 95%, var(--workspace-accent-color, #169958))',
          100: 'color-mix(in lab, transparent 90%, var(--workspace-accent-color, #169958))',
          200: 'color-mix(in lab, transparent 80%, var(--workspace-accent-color, #169958))',
          500: 'var(--workspace-accent-color, #169958)'
        }
      },
      positive: {
        50: 'rgba(2, 144, 98, 0.05)',
        100: 'rgba(2, 144, 98, 0.1)',
        200: 'rgba(2, 144, 98, 0.2)',
        300: 'rgba(2, 144, 98, 0.3)',
        400: 'rgba(2, 144, 98, 0.4)',
        500: '#029062'
      },
      danger: {
        50: 'rgba(201, 45, 69, 0.05)',
        100: 'rgba(201, 45, 69, 0.1)',
        200: 'rgba(201, 45, 69, 0.2)',
        300: 'rgba(201, 45, 69, 0.3)',
        400: 'rgba(201, 45, 69, 0.4)',
        500: '#C92D45'
      },
      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#1F2937',
        800: '#030712'
      },
      sherwood: {
        50: 'rgba(25, 65, 54, 0.05)',
        100: 'rgba(25, 65, 54, 0.1)',
        200: 'rgba(25, 65, 54, 0.2)',
        300: 'rgba(25, 65, 54, 0.3)',
        400: 'rgba(25, 65, 54, 0.4)',
        500: '#194136',
        600: '#15372D',
        700: '#112C25'
      },
      warning: {
        50: 'rgba(222, 99, 19, 0.05)',
        100: 'rgba(222, 99, 19, 0.1)',
        200: 'rgba(222, 99, 19, 0.2)',
        300: 'rgba(222, 99, 19, 0.3)',
        400: 'rgba(222, 99, 19, 0.4)',
        500: '#DE6313'
      },
      white: {
        DEFAULT: '#FFFFFF',
        5: 'rgba(255, 255, 255, 0.05)',
        10: 'rgba(255, 255, 255, 0.1)',
        20: 'rgba(255, 255, 255, 0.2)',
        30: 'rgba(255, 255, 255, 0.3)',
        40: 'rgba(255, 255, 255, 0.4)',
        50: 'rgba(255, 255, 255, 0.5)',
        60: 'rgba(255, 255, 255, 0.6)',
        70: 'rgba(255, 255, 255, 0.7)',
        80: 'rgba(255, 255, 255, 0.8)',
        90: 'rgba(255, 255, 255, 0.9)'
      },
      yellow: {
        50: 'rgba(215, 135, 0, 0.05)',
        100: 'rgba(215, 135, 0, 0.1)',
        200: 'rgba(215, 135, 0, 0.2)',
        300: 'rgba(215, 135, 0, 0.3)',
        400: 'rgba(215, 135, 0, 0.4)',
        500: '#D78700',
        600: '#FAD744'
      },
      blue: {
        50: 'rgba(0, 101, 183, 0.05)',
        100: 'rgba(0, 101, 183, 0.1)',
        200: 'rgba(0, 101, 183, 0.2)',
        300: 'rgba(0, 101, 183, 0.3)',
        400: 'rgba(0, 101, 183, 0.4)',
        500: '#0065B7'
      },
      red: {
        50: 'rgba(255, 33, 22, 0.05)',
        100: 'rgba(255, 33, 22, 0.1)',
        500: 'rgba(255, 33, 22, 1)'
      },
      purple: {
        50: 'rgba(136, 74, 190, 0.05)',
        100: 'rgba(136, 74, 190, 0.1)',
        200: 'rgba(136, 74, 190, 0.2)',
        300: 'rgba(136, 74, 190, 0.3)',
        400: 'rgba(136, 74, 190, 0.4)',
        500: '#884ABE'
      }
    },

    boxShadow: {
      active:
        '0px 0px 0px 2px color-mix(in lab, transparent 88%, var(--workspace-accent-color, #169958))',
      warning: '0px 0px 0px 2px rgba(215, 135, 0, 0.12)' 
    },

    letterSpacing: {
      tightest: '-0.567px',
      tighter: '-0.304px',
      tight: '-0.07px',
      normal: '-0.039px',
      wide: '0.055px'
    },

    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: [
        'CommitMono',
        'ui-monospace',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Ubuntu Mono"',
        '"Roboto Mono"',
        '"DejaVu Sans Mono"',
        'monospace'
      ]
    }
  }
}
