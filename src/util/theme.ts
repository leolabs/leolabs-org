export interface Theme {
  bg: string;
  text: string;
  brand: string;
}

export const themes = {
  light: {
    bg: '#fff',
    'header-bg': 'rgba(255, 255, 255, 0.9)',
    text: '#17252A',
    brand: '#964A61', //'#006bb7',
  },
  dark: {
    bg: '#2c2e33',
    'header-bg': 'rgba(44, 46, 51, 0.9)',
    text: '#efefef',
    brand: '#964A61', //'#006bb7',
  },
};

export type Mode = keyof typeof themes;

export const dimensions = {
  maxWidth: '80rem',
  fontSizes: {
    h1: '2.5em',
    h2: '2em',
    h3: '1.90em',
    h4: '1.5em',
    h5: '1.25em',
    p: '1em',
  },
  borderRadius: {
    normal: '0.5rem',
  },
};
