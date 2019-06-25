import React from 'react';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';
import { Intro } from '../components/intro';
import { TraktMovies } from '../components/trakt-movies';
import { TraktShows } from '../components/trakt-shows';
import { SpotifyTracks } from '../components/spotify-tracks';
import { SpotifyPlaylists } from '../components/spotify-playlists';

import featuredPlaylists from '../../data/featured-playlists.json';
import { dimensions } from '../util/theme';

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
  max-width: ${dimensions.maxWidth};
  margin: auto;
  margin-bottom: 4rem;
`;

const IndexPage = () => {
  return (
    <Layout title="Hi, I'm Leo." page="index">
      <IntroContainer>
        <Intro />
      </IntroContainer>

      <Section>
        <h3>Featured Playlists</h3>
        <SpotifyPlaylists featured={featuredPlaylists} />
      </Section>

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
