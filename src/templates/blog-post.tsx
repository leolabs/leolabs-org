import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';

const Content = styled.article`
  margin: auto;
  padding: 1.5rem;
  padding-top: 10rem;
  max-width: 42rem;
  font-size: 20px;

  > h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  > .meta {
    text-align: center;
    opacity: 0.8;
    margin-bottom: 6rem;
  }

  > .content {
    h2 {
      margin-top: 100px;
      text-align: center;
    }

    h2::after {
      content: '';
      display: block;
      height: 0px;
      width: 80px;
      margin: auto;
      margin-top: 16px;
      margin-bottom: 20px;
      border-bottom: 2px solid #bbb;
    }

    img {
      display: block;
      max-width: 100%;
    }

    blockquote {
      margin: 1.5em;
      margin-left: 0;
      padding-left: 1.5em;
      opacity: 0.8;
      border-left: solid 4px currentColor;
    }

    li ul,
    li ol {
      margin: 0;
    }
    ul,
    ol {
      margin: 0 3em 1.5em 1.5em;
      padding-left: 1.5em;
    }
    ul {
      list-style-type: disc;
    }
    ol {
      list-style-type: decimal;
    }
    ol p,
    ul p {
      margin-bottom: 0px;
    }
    li {
      margin-bottom: 0.75em;
      margin-top: 0.75em;
    }

    strong,
    dfn {
      font-weight: bold;
    }

    em,
    dfn {
      font-style: italic;
    }

    del {
      color: #666;
    }

    pre {
      margin: 1.5em 0;
      white-space: pre;
    }
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout page="blog" title={post.frontmatter.title}>
      <Content>
        <h1>{post.frontmatter.title}</h1>
        <p className="meta">
          {post.frontmatter.date} | {post.fields.readingTime.text}
        </p>
        <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        description
        title
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
