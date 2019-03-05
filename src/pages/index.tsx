import React from 'react';
import { Layout } from '../components/layout';
import styled from '../util/styled-components';
import { Intro } from '../components/intro';
import { TraktMovies } from '../components/trakt-movies';
import { TraktShows } from '../components/trakt-shows';
import { SpotifyTracks } from '../components/spotify-tracks';

const IntroContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 100px 0;
  min-height: calc(100vh);
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
        <h3>Music I'm listening to</h3>
        <SpotifyTracks />
      </Section>

      <Section>
        <h3>Movies I watched</h3>
        <TraktMovies />
      </Section>

      <Section>
        <h3>Shows I'm watching</h3>
        <TraktShows />
      </Section>
    </Layout>
  );
};

export default IndexPage;
