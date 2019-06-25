import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium, MediumTitle } from './media-grid';
import GatsbyImage from 'gatsby-image';

interface SpotifyPlaylistsProps {
  featured: string[];
}

export const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ featured }) => {
  const playlists = useStaticQuery(graphql`
    query {
      allSpotifyPlaylist(filter: { owner: { id: { eq: "leolabs" } } }) {
        edges {
          node {
            uri
            name
            external_urls {
              spotify
            }
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 300, maxHeight: 300, quality: 90) {
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

  console.log(featured);
  console.log(playlists);

  return (
    <MediaGrid>
      {playlists.allSpotifyPlaylist.edges
        .filter(e => featured.includes(e.node.uri))
        .map(e => (
          <Medium
            title={`${e.node.name}`}
            target="_blank"
            href={e.node.external_urls.spotify}
            key={e.node.external_urls.spotify}
          >
            <GatsbyImage
              fluid={e.node.image.localFile.childImageSharp.fluid}
              alt={`Album cover for ${e.node.name}`}
            />
            <MediumTitle>
              <span>{e.node.name}</span>
            </MediumTitle>
          </Medium>
        ))}
    </MediaGrid>
  );
};
