import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium, MediumTitle } from './media-grid';
import GatsbyImage from 'gatsby-image';

const generateLink = (slug: string) => `https://trakt.tv/movies/${slug}`;

interface TraktMoviesProps {
  limit?: number;
}

export const TraktMovies: React.FC<TraktMoviesProps> = ({ limit }) => {
  const movies = useStaticQuery(graphql`
    query {
      allTraktWatchedMovie(
        limit: 6
        sort: { fields: last_watched_at, order: DESC }
      ) {
        edges {
          node {
            last_watched_at(fromNow: true)
            movie {
              ids {
                slug
              }
            }
            tmdb_metadata {
              title
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
      {movies.allTraktWatchedMovie.edges.slice(0, limit || 6).map(e => (
        <Medium
          title={`${e.node.tmdb_metadata.title} (watched ${e.node.last_watched_at})`}
          target="_blank"
          href={generateLink(e.node.movie.ids.slug)}
          key={e.node.movie.ids.slug}
        >
          <GatsbyImage
            fluid={e.node.tmdb_metadata.poster.localFile.childImageSharp.fluid}
            alt={`Movie poster for ${e.node.tmdb_metadata.title}`}
          />
          <MediumTitle>{e.node.last_watched_at}</MediumTitle>
        </Medium>
      ))}
    </MediaGrid>
  );
};
