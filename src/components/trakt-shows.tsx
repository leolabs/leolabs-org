import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium, MediumTitle } from './media-grid';
import GatsbyImage from 'gatsby-image';
import leftPad from 'left-pad';

const generateLink = (slug: string, seasons: any[]) => {
  console.log(seasons);
  const { season, episode } = getLatestEpisode(seasons);
  return `https://trakt.tv/shows/${slug}/seasons/${season}/episodes/${episode}`;
};

const getLatestEpisode = (seasons: any[]) => {
  const latest = seasons.reduce((acc, cur) => {
    const latestEpisode = [...(cur.episodes as any[])]
      .sort(
        (a, b) =>
          new Date(b.last_watched_at).getTime() -
          new Date(a.last_watched_at).getTime(),
      )
      .shift();

    if (
      !acc ||
      (latestEpisode &&
        new Date(latestEpisode.last_watched_at).getTime() >
          new Date(acc.last_watched_at).getTime())
    ) {
      return {
        ...latestEpisode,
        season: cur.number,
      };
    }

    return acc;
  }, null);

  return {
    string: `S${leftPad(latest.season, 2, '0')}E${leftPad(latest.number, 2, '0')}`,
    season: latest.season,
    episode: latest.number,
  };
};

interface TraktShowsProps {
  limit?: number;
}

export const TraktShows: React.FC<TraktShowsProps> = ({ limit }) => {
  const shows = useStaticQuery(graphql`
    query {
      allTraktWatchedShow(limit: 6, sort: { fields: last_watched_at, order: DESC }) {
        edges {
          node {
            last_watched_at(fromNow: true)
            show {
              ids {
                slug
              }
            }
            seasons {
              number
              episodes {
                number
                last_watched_at
              }
            }
            tmdb_metadata {
              name
              poster {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 300, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <MediaGrid>
      {shows.allTraktWatchedShow.edges.slice(0, limit || 5).map(e => (
        <Medium
          title={`${e.node.tmdb_metadata.name} (watched ${e.node.last_watched_at})`}
          target="_blank"
          href={generateLink(e.node.show.ids.slug, e.node.seasons)}
          key={e.node.show.ids.slug}
        >
          <GatsbyImage
            fluid={e.node.tmdb_metadata.poster.localFile.childImageSharp.fluid}
            alt={`Movie poster for ${e.node.tmdb_metadata.title}`}
          />
          <MediumTitle>
            <span>{getLatestEpisode(e.node.seasons).string}</span>
            <span className="faded">{e.node.last_watched_at}</span>
          </MediumTitle>
        </Medium>
      ))}
    </MediaGrid>
  );
};