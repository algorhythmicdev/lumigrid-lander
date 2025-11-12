/**
 * Design Tokens System
 * Apple-inspired design system tokens for LumiGrid
 */

export const tokens = {
  colors: {
    brand: {
      primary: '#0071e3',
      ledCyan: '#00d4ff',
      ledAmber: '#ff9500',
      ledMagenta: '#ff2d55',
      ledCherry: '#ff3b30',
    },
    neutral: {
      bg: {
        primary: '#000000',
        secondary: '#1d1d1f',
        tertiary: '#2d2d2f',
        base: '#050505',
      },
      text: {
        primary: '#f5f5f7',
        secondary: '#a1a1a6',
        tertiary: '#6e6e73',
      },
    },
    glass: {
      bg: 'rgba(29, 29, 31, 0.72)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    full: '9999px',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  typography: {
    fontFamily: {
      display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, system-ui, sans-serif',
    },
    fontSize: {
      displayXl: 'clamp(3rem, 8vw, 6rem)',
      displayLg: 'clamp(2rem, 5vw, 3.5rem)',
      title1: 'clamp(1.75rem, 4vw, 2.5rem)',
      title2: 'clamp(1.5rem, 3vw, 2rem)',
      bodyLg: 'clamp(1.0625rem, 2vw, 1.25rem)',
      body: '1rem',
      caption: '0.875rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  effects: {
    shadow: {
      card: '0 2px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15)',
      cardHover: '0 4px 12px rgba(0, 0, 0, 0.15), 0 12px 32px rgba(0, 0, 0, 0.2)',
    },
    blur: {
      glass: '20px',
      backdrop: '10px',
    },
  },
};

export type Tokens = typeof tokens;
