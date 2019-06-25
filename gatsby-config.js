require('dotenv-safe').config();
require('ts-node').register();

const { themes } = require('./src/util/theme');

module.exports = {
  siteMetadata: {},
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-linaria`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-article`,
        path: `${__dirname}/content/blog/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `leolabs.org`,
        short_name: `leolabs.org`,
        start_url: `/`,
        background_color: '#fff',
        theme_color: themes.light.brand,
        display: `minimal-ui`,
        icon: `src/images/logo-square.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'assets',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-embed-video',
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: `gatsby-source-trakt-tmdb`,
      options: {
        tmdbApiKey: process.env.TMDB_API_KEY,
        traktApiKey: process.env.TRAKT_API_KEY,
        username: process.env.TRAKT_USER,
        limit: 6,
      },
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
        fetchPlaylists: true,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {},
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
