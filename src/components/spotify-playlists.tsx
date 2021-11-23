import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MediaGrid, Medium, MediumTitle } from './media-grid';
import { GatsbyImage } from 'gatsby-plugin-image';

interface SpotifyPlaylistsProps {
  featured: string[];
}

export const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ featured }) => {
  const playlists = useStaticQuery(graphql`
    {
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
                  gatsbyImageData(
                    width: 600
                    height: 600
                    quality: 90
                    layout: CONSTRAINED
                  )
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
      {playlists.allSpotifyPlaylist.edges
        .filter((e) => featured.includes(e.node.uri))
        .map((e) => (
          <Medium
            title={`${e.node.name}`}
            target="_blank"
            href={e.node.external_urls.spotify}
            key={e.node.external_urls.spotify}
          >
            <GatsbyImage
              image={e.node.image.localFile.childImageSharp.gatsbyImageData}
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
