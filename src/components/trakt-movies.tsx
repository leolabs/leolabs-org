import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium, MediumTitle } from './media-grid';
import { GatsbyImage } from "gatsby-plugin-image";

const generateLink = (slug: string) => `https://trakt.tv/movies/${slug}`;

interface TraktMoviesProps {
  limit?: number;
}

export const TraktMovies: React.FC<TraktMoviesProps> = ({ limit }) => {
  const movies = useStaticQuery(graphql`{
  allTraktWatchedMovie(limit: 6, sort: {fields: last_watched_at, order: DESC}) {
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
                gatsbyImageData(width: 300, height: 450, quality: 90, layout: CONSTRAINED)
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
      {movies.allTraktWatchedMovie.edges
        .filter(e => e.node.tmdb_metadata)
        .slice(0, limit || 6)
        .map(e => (console.log(e.node.tmdb_metadata), e))
        .map(e => (
          <Medium
            title={`${e.node.tmdb_metadata.title} (watched ${e.node.last_watched_at})`}
            target="_blank"
            href={generateLink(e.node.movie.ids.slug)}
            key={e.node.movie.ids.slug}
          >
            <GatsbyImage
              image={e.node.tmdb_metadata.poster.localFile.childImageSharp.gatsbyImageData}
              alt={`Movie poster for ${e.node.tmdb_metadata.title}`} />
            <MediumTitle>{e.node.last_watched_at}</MediumTitle>
          </Medium>
        ))}
    </MediaGrid>
  );
};
