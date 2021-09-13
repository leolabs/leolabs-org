import styled from 'styled-components';
import { dimensions } from '../util/theme';
import React, { useState, ComponentProps } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

import TwitterIcon from '../images/social-icons/twitter.svg';
import TraktTvIcon from '../images/social-icons/trakt-tv.svg';
import SpotifyIcon from '../images/social-icons/spotify.svg';
import GitHubIcon from '../images/social-icons/github.svg';
import GumroadIcon from '../images/social-icons/gumroad.svg';

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
  opacity: ${(p) => (p.loaded ? 1 : 0)};
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
    text-decoration: underline var(--color-brand);
  }

  p {
    font-size: 2.8rem;
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

const SmallIntroText = styled.div`
  h2 {
    color: var(--color-brand);
    font-weight: normal;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  p {
    margin-bottom: 0;
  }

  .social {
    display: flex;
    flex-wrap: wrap;

    a {
      margin-right: 0.8rem;
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

  filter: var(--color-icon);

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
          playsInline
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

const IntroContent = () => (
  <>
    <h2>Hey there! My name is Leo Bernard.</h2>
    <p>
      I'm a Mu­si­cian and Developer at <a href="https://yourtempo.co">Tempo</a>.
      <br />I love Mu­sic, Movies, Com­put­ers, and Cats.
    </p>
  </>
);

const socials = [
  { icon: TwitterIcon, title: 'Twitter', href: 'https://twitter.com/leolabs_org' },
  { icon: GitHubIcon, title: 'GitHub', href: 'https://github.com/leolabs' },
  { icon: GumroadIcon, title: 'Gumroad', href: 'https://store.leolabs.org/' },
  {
    icon: SpotifyIcon,
    title: 'Spotify',
    href: 'https://open.spotify.com/user/leolabs',
  },
  { icon: TraktTvIcon, title: 'Trakt', href: 'https://trakt.tv/users/leolabs' },
];

export const SmallIntro = () => (
  <SmallIntroText>
    <IntroContent />
    <p className="social">
      {socials.map((s) => (
        <a href={s.href} key={s.href} target="_blank">
          {s.title}
        </a>
      ))}
    </p>
  </SmallIntroText>
);

export const Intro: React.FC = () => {
  return (
    <IntroBox>
      <Portrait />
      <IntroText>
        <IntroContent />
      </IntroText>

      <Social>
        {socials.map((s) => (
          <SocialItem target="_blank" href={s.href}>
            <img src={s.icon} alt={s.title} key={s.href} />
          </SocialItem>
        ))}
      </Social>
    </IntroBox>
  );
};
