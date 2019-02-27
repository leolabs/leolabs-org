import React from 'react';
import { Layout } from '../components/layout';
import styled from '../util/styled-components';
import { Intro } from '../components/intro';
import { TraktMovies } from '../components/trakt-grid';

const IntroContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: calc(100vh - 14rem);
`;

const Section = styled.section`
  padding: 1rem;
  max-width: ${p => p.theme.dimensions.maxWidth};
  margin: auto;
  margin-bottom: 4rem;
`;

const IndexPage = () => {
  return (
    <Layout title="Hi, I'm Leo.">
      <IntroContainer>
        <Intro />
      </IntroContainer>

      <Section>
        <h3>Movies I watched</h3>
        <TraktMovies />
      </Section>
    </Layout>
  );
};

export default IndexPage;
