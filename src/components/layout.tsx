import React from 'react';
import Helmet from 'react-helmet';
import { Header } from './header';
import { ThemeContext } from '../util/theme-context';

interface LayoutProps {
  title: string;
  page: string;
  useRawTitle?: boolean;
  description?: string;
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
          <meta name="description" content={props.description} />
          <html lang="en" />
        </Helmet>
        <Header page={props.page} />
        {props.children}
      </>
    </ThemeContext>
  );
};
