import React from 'react';

const Preview: React.FC<any> = ({ entry, widgetFor }) => (
  <article>
    <div className="meta">
      <h1>{widgetFor('title')}</h1>
      <p>Leo Bernard | 5 min read</p>
    </div>
    <div className="content">{widgetFor('body')}</div>
  </article>
);

export default Preview;
