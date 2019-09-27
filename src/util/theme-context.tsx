import React, { useState, useEffect, useMemo } from 'react';
import { Mode, themes, dimensions } from './theme';
import { css } from 'linaria';

const themeStyles = css`
  :global() {
    body {
      --color-text: ${themes.light.text};
      --color-bg: ${themes.light.bg};
      --color-header-bg: ${themes.light['header-bg']};
      --color-brand: ${themes.light.brand};

      @media (prefers-color-scheme: dark) {
        --color-text: ${themes.dark.text};
        --color-bg: ${themes.dark.bg};
        --color-header-bg: ${themes.dark['header-bg']};
        --color-brand: ${themes.dark.brand};
        --color-icon: invert(100%);
      }

      margin: 0;
      color: var(--color-text);
      background: var(--color-bg);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      font-size: 18px;
    }

    hr {
      border: none;
      border-bottom: 1px solid var(--color-border);
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
      color: var(--color-brand);
      text-decoration: none;

      &:hover,
      &:focus {
        opacity: 0.8;
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
