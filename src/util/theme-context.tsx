import React, { useState, useEffect, useMemo } from 'react';
import { Mode, themes, dimensions } from './theme';
import { css } from 'linaria';

const themeStyles = css`
  :global() {
    body {
      margin: 0;
      color: var(--color-text);
      background: var(--color-bg);
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
      color: var(--color-text);
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

export const ThemeContext: React.FC<{ theme?: Mode }> = ({ children, theme }) => {
  const [mode, setMode] = useState<Mode>('light');

  useEffect(() => {
    if (theme) {
      setMode(theme);
      return;
    }

    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkMode = matcher.matches;

    if (isDarkMode) {
      setMode('dark');
    }

    const listener = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
    };
    matcher.addListener(listener);

    return () => {
      matcher.removeListener(listener);
    };
  }, [theme]);

  useEffect(() => {
    Object.keys(themes[mode]).forEach(key => {
      document.body.style.setProperty(`--color-${key}`, themes[mode][key]);
    });
  }, [mode]);

  return <div className={themeStyles}>{children}</div>;
};
