const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content/blog` });
    createNodeField({ node, name: `slug`, value: slug.slice(12) });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              alias
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `blog/${node.fields.slug}`,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          slug: node.fields.slug,
        },
      });

      if (node.frontmatter.alias && node.frontmatter.alias.length) {
        for (const alias of node.frontmatter.alias) {
          createRedirect({
            fromPath: alias,
            toPath: `blog/${node.fields.slug}`,
            isPermanent: true,
          });
        }
      }
    });
  });
};
