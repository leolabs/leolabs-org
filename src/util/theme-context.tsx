import React, { useState, useEffect, useMemo } from 'react';
import { Mode, themes, dimensions } from './theme';
import { css } from 'linaria';

const themeStyles = css`
  :global() {
    body {
      margin: 0;
      background-color: var(--color-bg);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    }

    h1 {
      margin-top: 0;
      font-size: ${dimensions.fontSizes.h1};
    }

    h2 {
      font-size: ${dimensions.fontSizes.h2};
    }

    h3 {
      font-size: ${dimensions.fontSizes.h3};
    }

    h4 {
      font-size: ${dimensions.fontSizes.h4};
    }

    h5 {
      font-size: ${dimensions.fontSizes.h5};
    }

    p {
      font-size: ${dimensions.fontSizes.p};
      line-height: 1.6;
      margin-top: 0;
    }

    a {
      color: inherit;
      text-decoration: underline var(--color-brand);

      &:hover,
      &:focus {
        color: var(--color-text);
      }
    }
  }
`;

export const ThemeContext: React.FC<{ mode?: Mode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
      setMode('dark');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(e => setMode(e.matches ? 'dark' : 'light'));
  });

  const style = useMemo(
    () =>
      Object.keys(themes[mode]).reduce((acc, cur) => {
        acc[`--color-${cur}`] = themes[mode][cur];
        return acc;
      }, {}),
    [mode],
  );

  return (
    <div style={style} className={themeStyles}>
      {children}
    </div>
  );
};
