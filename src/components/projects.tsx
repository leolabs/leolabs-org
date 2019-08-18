import React, { useState, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { styled } from 'linaria/react';
import { spawn } from 'child_process';

const ProjectList = styled.ul`
  list-style: none;
  padding: 0;

  h4 {
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;

    span {
      font-size: 80%;
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-weight: lighter;
      background: var(--color-border);
      margin-left: 1rem;
    }
  }
`;

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const { allProjectsYaml } = useStaticQuery(graphql`
    query {
      allProjectsYaml(sort: { fields: [date], order: DESC }) {
        nodes {
          name
          url
          description
          languages
        }
      }
    }
  `);

  const projects = useMemo(
    () => (showAll ? allProjectsYaml.nodes : allProjectsYaml.nodes.slice(0, 3)),
    [showAll],
  );

  return (
    <>
      <ProjectList>
        {projects.map(project => (
          <li>
            <h4>
              <a href={project.url} target="_blank">
                {project.name}
              </a>
              {project.languages && (
                <div>
                  {project.languages.map(l => (
                    <span>{l}</span>
                  ))}
                </div>
              )}
            </h4>
            <p>{project.description}</p>
          </li>
        ))}
      </ProjectList>
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          setShowAll(showAll => !showAll);
        }}
      >
        {showAll ? 'Show Less' : 'Show More'}
      </a>
    </>
  );
};
