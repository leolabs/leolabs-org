import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium } from './media-grid';
import { GatsbyImage } from "gatsby-plugin-image";

interface SpotifyArtistsProps {
  limit?: number;
}

export const SpotifyArtists: React.FC<SpotifyArtistsProps> = ({ limit }) => {
  const artists = useStaticQuery(graphql`{
  allSpotifyTopArtist(
    limit: 6
    filter: {time_range: {eq: "short_term"}}
    sort: {fields: order}
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
              gatsbyImageData(width: 300, quality: 90, layout: CONSTRAINED)
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
            image={e.node.image.localFile.childImageSharp.gatsbyImageData}
            alt={`Profile picture for ${e.node.name}`} />
        </Medium>
      ))}
    </MediaGrid>
  );
};
