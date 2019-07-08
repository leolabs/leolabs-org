import { styled } from 'linaria/react';
import { dimensions } from '../util/theme';
import React, { useState, ComponentProps } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

import TwitterIcon from '../images/social-icons/twitter.svg';
import TraktTvIcon from '../images/social-icons/trakt-tv.svg';
import SpotifyIcon from '../images/social-icons/spotify.svg';
import GitHubIcon from '../images/social-icons/github.svg';

const IntroBox = styled.div`
  width: 100%;
  max-width: ${dimensions.maxWidth};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PortraitCircle = styled.div`
  width: 100%;
  max-width: 16rem;
  border-radius: 1000px;
  overflow: hidden;
  transform: translateZ(0);
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    max-width: 12rem;
  }
`;

const PortraitSizer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
`;

const Image = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Video = styled.video<{ loaded: boolean } & ComponentProps<'video'>>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: opacity 0.2s;
  opacity: ${p => (p.loaded ? 1 : 0)};
  z-index: 2;
`;

const IntroText = styled.div`
  h2 {
    color: var(--color-brand);
    font-weight: normal;

    margin-bottom: 1rem;
  }

  a {
    color: var(--color-text);
  }

  p {
    font-size: 3rem;
    font-weight: 300;
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;

const Social = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SocialItem = styled.a`
  opacity: 0.7;
  transition: opacity 0.2s;
  margin: 0.5rem;

  &:hover {
    opacity: 1;
  }

  img {
    width: 2rem;
    height: auto;
  }
`;

export const Portrait: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const image = useStaticQuery(graphql`
    query {
      file(base: { eq: "portrait-square.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <PortraitCircle>
      <PortraitSizer>
        <Image fluid={image.file.childImageSharp.fluid} />
        <Video
          autoPlay
          muted
          loop
          controls={false}
          loaded={videoLoaded}
          onPlaying={() => setVideoLoaded(true)}
        >
          <source type="video/webm" src="/assets/portrait-video.webm" />
          <source type="video/mp4" src="/assets/portrait-video.mp4" />
          <source type="video/ogg" src="/assets/portrait-video.ogv" />
        </Video>
      </PortraitSizer>
    </PortraitCircle>
  );
};

export const Intro: React.FC = () => {
  return (
    <IntroBox>
      <Portrait />
      <IntroText>
        <h2>Hey there! My name is Leo Bernard.</h2>
        <p>
          I'm a Stu­dent, Mu­si­cian and Developer at{' '}
          <a href="https://crisp.studio">Crisp Studio</a>.<br />I love Mu­sic,
          Movies, Com­put­ers, and Cats.
        </p>
      </IntroText>
      <Social>
        <SocialItem target="_blank" href="https://twitter.com/leolabs_org">
          <img src={TwitterIcon} alt="Twitter" />
        </SocialItem>
        <SocialItem target="_blank" href="https://github.com/leolabs">
          <img src={GitHubIcon} alt="GitHub" />
        </SocialItem>
        <SocialItem target="_blank" href="https://open.spotify.com/user/leolabs">
          <img src={SpotifyIcon} alt="Spotify" />
        </SocialItem>
        <SocialItem target="_blank" href="https://trakt.tv/users/leolabs">
          <img src={TraktTvIcon} alt="TraktTv" />
        </SocialItem>
      </Social>
    </IntroBox>
  );
};
