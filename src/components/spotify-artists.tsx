import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium } from './media-grid';
import GatsbyImage from 'gatsby-image';

interface SpotifyArtistsProps {
  limit?: number;
}

export const SpotifyArtists: React.FC<SpotifyArtistsProps> = ({ limit }) => {
  const artists = useStaticQuery(graphql`
    query {
      allSpotifyTopArtist(
        limit: 6
        filter: { time_range: { eq: "short_term" } }
        sort: { fields: order }
      ) {
        edges {
          node {
            name
            external_urls {
              spotify
            }
            image {
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
  `);

  return (
    <MediaGrid>
      {artists.allSpotifyTopArtist.edges.slice(0, limit || 5).map(e => (
        <Medium
          title={`${e.node.name}`}
          target="_blank"
          href={e.node.external_urls.spotify}
          key={e.node.external_urls.spotify}
        >
          <GatsbyImage
            fluid={e.node.image.localFile.childImageSharp.fluid}
            alt={`Profile picture for ${e.node.name}`}
          />
        </Medium>
      ))}
    </MediaGrid>
  );
};
