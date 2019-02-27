import React from 'react';
import { createGlobalStyle, ThemeProvider } from '../util/styled-components';
import Helmet from 'react-helmet';
import theme from '../util/theme';
import { Header } from './header';

interface LayoutProps {
  title: string;
  useRawTitle?: boolean;
  description?: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  }

  h1 {
    margin-top: 0;
    font-size: ${p => p.theme.fontSizes.h1}
  }

  h2 {
    font-size: ${p => p.theme.fontSizes.h2}
  }

  h3 {
    font-size: ${p => p.theme.fontSizes.h3}
  }

  h4 {
    font-size: ${p => p.theme.fontSizes.h4}
  }

  h5 {
    font-size: ${p => p.theme.fontSizes.h5}
  }

  p {
    line-height: 1.5;
    margin-top: 0;
  }
`;

export const Layout: React.FC<LayoutProps> = props => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Helmet>
          <title>
            {props.title}
            {!props.useRawTitle ? ' – leolabs.org' : ''}
          </title>
          <meta name="description" content={props.description} />
          <html lang="en" />
        </Helmet>
        <Header />
        {props.children}
      </>
    </ThemeProvider>
  );
};
