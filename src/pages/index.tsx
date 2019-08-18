import React from 'react';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';
import { Intro } from '../components/intro';
import { LatestPosts } from '../components/latest-posts';
import { Projects } from '../components/projects';
import { SpotifyPlaylists } from '../components/spotify-playlists';
import { SpotifyTracks } from '../components/spotify-tracks';
import { TraktMovies } from '../components/trakt-movies';
import { TraktShows } from '../components/trakt-shows';

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

const SplitSection = styled.section`
  display: grid;
  grid-gap: 4rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

      <SplitSection>
        <div>
          <h3>My Latest Posts</h3>
          <LatestPosts />
        </div>
        <div>
          <h3>My Projects</h3>
          <Projects />
        </div>
      </SplitSection>

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
