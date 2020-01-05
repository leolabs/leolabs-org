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
      --color-border: rgba(0, 0, 0, 0.1);

      @media (prefers-color-scheme: dark) {
        --color-text: ${themes.dark.text};
        --color-bg: ${themes.dark.bg};
        --color-header-bg: ${themes.dark['header-bg']};
        --color-brand: ${themes.dark.brand};
        --color-border: rgba(255, 255, 255, 0.1);
        --color-icon: invert(100%);
      }

      @media print {
        --color-text: ${themes.light.text};
        --color-bg: ${themes.light.bg};
        --color-header-bg: ${themes.light['header-bg']};
        --color-brand: ${themes.light.brand};
        --color-border: rgba(0, 0, 0, 0.1);

        header {
          display: none;
        }

        main,
        article {
          padding: 0 !important;
        }
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

    @media (max-width: 700px) {
      h1 {
        font-size: ${dimensions.fontSizes.h2};
      }
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
  return <div className={themeStyles}>{children}</div>;
};
