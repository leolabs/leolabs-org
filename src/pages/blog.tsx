import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';
import { SmallIntro } from '../components/intro';

const Articles = styled.div`
  display: block;
  padding: 1.5rem;
  padding-top: 10rem;
  margin: auto;
  max-width: 42rem;

  > h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  > p {
    margin-bottom: 3rem;
  }
`;

const Article = styled.div`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0;
  }

  .meta {
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }
`;

const Footer = styled.footer`
  max-width: 42rem;
  padding: 3rem 1.5rem;
  margin: auto;
  margin-top: 1.5rem;
  border-top: 1px solid var(--color-border);
`;

const Post = ({ node }) => (
  <Article key={node.fields.slug}>
    <h2>
      <Link to={`blog/${node.fields.slug}`}>{node.frontmatter.title}</Link>
    </h2>

    <p className="meta">
      {node.frontmatter.date} | {node.timeToRead} min read
    </p>
    <p>{node.excerpt}</p>
  </Article>
);

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const currentYear = posts[0].node.frontmatter.year;

  const newPosts = posts.filter(p => p.node.frontmatter.year === currentYear);
  const oldPosts = posts.filter(p => p.node.frontmatter.year !== currentYear);

  return (
    <Layout page="blog" title="Blog">
      <Articles>
        <h1>Blog</h1>
        <p>Sometimes I write stuff. You can find it here.</p>
        {newPosts.map(p => (
          <Post node={p.node} />
        ))}

        <hr />

        <h2>
          Archive ({oldPosts[oldPosts.length - 1].node.frontmatter.year} -{' '}
          {oldPosts[0].node.frontmatter.year})
        </h2>
        <p>
          Older articles can be found here. The may not be up to date anymore, but
          I'd like to keep them online just in case.
        </p>

        {oldPosts.map(p => (
          <Post node={p.node} />
        ))}
      </Articles>
      <Footer>
        <SmallIntro />
      </Footer>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          html
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            year: date(formatString: "YYYY")
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
