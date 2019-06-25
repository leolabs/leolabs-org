export interface Theme {
  bg: string;
  text: string;
  brand: string;
}

export const themes: { [k: string]: Theme } = {
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
    h1: '3.052rem',
    h2: '2.441rem',
    h3: '1.953rem',
    h4: '1.563rem',
    h5: '1.25rem',
    p: '1.125rem',
  },
  borderRadius: {
    normal: '0.5rem',
  },
};
