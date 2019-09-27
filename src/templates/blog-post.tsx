import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { styled } from 'linaria/react';
import { dimensions } from '../util/theme';
import { SmallIntro } from '../components/intro';

require('prismjs/themes/prism-okaidia.css');

export const Content = styled.article`
  margin: auto;
  padding: 0 1.5rem;
  padding-top: 10rem;
  max-width: 42rem;
  font-size: 20px;

  > .meta {
    p {
      text-align: center;
      opacity: 0.8;
      margin-bottom: 6rem;
    }

    h1 {
      text-align: center;
      margin-bottom: 0.5rem;
    }
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

    h3 {
      font-size: 1.5em;
    }

    .gatsby-resp-image-wrapper {
      border-radius: ${dimensions.borderRadius.normal};
      overflow: hidden;
      margin: 1em 0;
    }

    .embed-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      margin-bottom: 40px;
    }
    .embed-container iframe,
    .embed-container object,
    .embed-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    > p > img {
      display: block;
      max-width: 100%;
      margin: 1em auto;
      border-radius: ${dimensions.borderRadius.normal};
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
      margin: 1em 0;
      font-size: 90%;
      white-space: pre;
      border-radius: ${dimensions.borderRadius.normal};
      background: hsl(223, 7%, 13%);
    }

    table {
      width: 100%;
      margin: 1em 0;
      border-radius: ${dimensions.borderRadius.normal};
      border: 1px solid var(--color-border);
      overflow: hidden;
      border-spacing: 0;
      empty-cells: show;

      thead {
        background: var(--color-border);
        vertical-align: bottom;
      }

      th {
        font-weight: 600;
        text-align: center;
      }

      td {
        vertical-align: top;
      }

      td,
      th {
        padding: 1rem;
      }
    }

    .footnotes {
      font-size: 90%;
      ol {
        margin: 0;
      }

      .footnote-backref {
      }
    }
  }
`;

const Footer = styled.footer`
  max-width: 42rem;
  padding: 3rem 1.5rem;
  margin: auto;
  margin-top: 3rem;
  border-top: 1px solid var(--color-border);
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout
      page="blog"
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      image={
        post.frontmatter.image
          ? process.env.GATSBY_SITE_URL +
            post.frontmatter.image.childImageSharp.fixed.src
          : undefined
      }
    >
      <Content>
        <div className="meta">
          <h1>{post.frontmatter.title}</h1>
          <p>
            {post.frontmatter.date} | {post.timeToRead} min read
          </p>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </Content>
      <Footer>
        <SmallIntro />
      </Footer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        description
        title
        image {
          childImageSharp {
            fixed(width: 1200, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`;
