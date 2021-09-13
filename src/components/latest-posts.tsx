import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const PostList = styled.ul`
  list-style: none;
  padding: 0;

  h4 {
    margin-bottom: 0.25rem;
  }

  p.meta {
    opacity: 0.8;
  }
`;

export const LatestPosts: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 2
      ) {
        nodes {
          html
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  return (
    <>
      <PostList>
        {allMarkdownRemark.nodes.map((post) => (
          <li>
            <h4>
              <Link to={`blog/${post.fields.slug}`}>{post.frontmatter.title}</Link>
            </h4>
            <p className="meta">
              {post.frontmatter.date} | {post.timeToRead} min read
            </p>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </PostList>
      <Link to="blog">View All Posts</Link>
    </>
  );
};
