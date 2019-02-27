import styled from '../util/styled-components';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

const MoviesGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const Movie = styled.a`
  display: block;
  overflow: hidden;
  border-radius: ${p => p.theme.borderRadius.normal};
`;

const generateLink = (slug: string) => `https://trakt.tv/movies/${slug}`;

interface TraktMoviesProps {
  maxMovies?: number;
}

export const TraktMovies: React.FC<TraktMoviesProps> = ({ maxMovies }) => {
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
    <MoviesGrid>
      {movies.allTraktWatchedMovie.edges.slice(0, maxMovies || 5).map(e => (
        <Movie
          title={`${e.node.tmdb_metadata.title} (watched ${e.node.last_watched_at})`}
          target="_blank"
          href={generateLink(e.node.movie.ids.slug)}
          key={e.node.movie.ids.slug}
        >
          <GatsbyImage
            fluid={e.node.tmdb_metadata.poster.localFile.childImageSharp.fluid}
            alt={`Movie poster for ${e.node.tmdb_metadata.title}`}
          />
        </Movie>
      ))}
    </MoviesGrid>
  );
};
