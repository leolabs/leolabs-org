require('dotenv-safe').config();
require('ts-node').register();

const { themes } = require('./src/util/theme');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://leolabs.org',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets/`,
      },
    },
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
        name: `blog-article`,
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `project`,
        path: `${__dirname}/content/projects/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `leolabs.org`,
        short_name: `leolabs.org`,
        start_url: `/`,
        background_color: '#fff',
        theme_color: themes.dark.bg,
        display: `minimal-ui`,
        icon: `src/images/logo-square.svg`,
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
              maxWidth: 700,
              quality: 80,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-external-links',
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
        limit: 8,
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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
  ],
};
