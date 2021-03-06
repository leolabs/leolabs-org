import React from 'react';
import Helmet from 'react-helmet';
import { Header } from './header';
import { ThemeContext } from '../util/theme-context';

interface LayoutProps {
  title: string;
  page: string;
  useRawTitle?: boolean;
  description?: string;
  image?: string;
}

export const Layout: React.FC<LayoutProps> = props => {
  return (
    <ThemeContext>
      <>
        <Helmet>
          <title>
            {props.title}
            {!props.useRawTitle ? ' – leolabs.org' : ''}
          </title>
          {props.description && (
            <meta name="description" content={props.description} />
          )}
          <meta
            name="twitter:card"
            content={props.image ? 'summary_large_image' : 'summary'}
          />
          {props.image && <meta name="og:image" content={props.image} />}
          <meta name="twitter:site" content="@leolabs_org" />
          <meta name="twitter:creator" content="@leolabs_org" />
          <script
            async
            defer
            data-domain="leolabs.org"
            src="https://plausible.io/js/plausible.js"
          />
          <html lang="en" />
        </Helmet>
        <Header page={props.page} />
        {props.children}
      </>
    </ThemeContext>
  );
};
