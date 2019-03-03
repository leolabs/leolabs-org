import styled from '../util/styled-components';
import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

import TwitterIcon from '../images/social-icons/twitter.svg';
import TraktTvIcon from '../images/social-icons/trakt-tv.svg';
import SpotifyIcon from '../images/social-icons/spotify.svg';
import GitHubIcon from '../images/social-icons/github.svg';

const IntroBox = styled.div`
  width: 100%;
  max-width: 35rem;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PortraitCircle = styled.div`
  width: 100%;
  max-width: 16rem;
  border-radius: 1000px;
  overflow: hidden;
  transform: translateZ(0);
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

const Video = styled.video<{ loaded: boolean }>`
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
      <h2>Hey there!</h2>
      <p>
        My name is Leo Bernard. I'm a Stu­dent, Mu­si­cian and De­vel­oper.
        <br />I love Pho­tog­ra­phy, Movies, Com­put­ers, Mu­sic and Cats.
      </p>
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
        <SocialItem target="_blank" href="https://trakt.tv/leolabs">
          <img src={TraktTvIcon} alt="TraktTv" />
        </SocialItem>
      </Social>
    </IntroBox>
  );
};
