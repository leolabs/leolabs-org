export interface Theme {
  bg: string;
  text: string;
  brand: string;
}

export const themes = {
  light: {
    bg: '#fff',
    text: '#17252A',
    brand: '#964A61', //'#006bb7',
  },
  dark: {
    bg: '#2c2e33',
    text: '#efefef',
    brand: '#964A61', //'#006bb7',
  },
};

export type Mode = keyof typeof themes;

export const dimensions = {
  maxWidth: '80rem',
  fontSizes: {
    h1: '2.5em',
    h2: '2.2em',
    h3: '1.953em',
    h4: '1.563em',
    h5: '1.25em',
    p: '1em',
  },
  borderRadius: {
    normal: '0.5rem',
  },
};
