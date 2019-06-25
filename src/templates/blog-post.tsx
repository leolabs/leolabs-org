import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';

const Content = styled.article`
  margin: auto;
  padding-top: 10rem;
  max-width: 40rem;

  h1 {
    text-align: center;
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout page="blog" title={post.frontmatter.title}>
      <Content>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
