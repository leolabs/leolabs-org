import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { styled } from 'linaria/react';

import { Portrait } from '../components/intro';
import {
  Linkedin,
  GitHub,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from 'react-feather';
import { Layout } from '../components/layout';

import resume from '../../data/resume.json';

const Wrapper = styled.main`
  margin: auto;
  padding: 0 1.5rem;
  padding-top: 10rem;
  max-width: 62rem;
  font-size: 1.25rem;

  p,
  ul {
    line-height: 1.5;
  }

  > h2 {
    margin-top: 4rem;
  }

  > h2:after {
    content: '';
    display: block;
    width: 10rem;
    height: 0;
    box-shadow: 0 0 0 1px currentColor;
    margin-top: 0.5rem;
  }
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: 192px 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;

  .portrait {
    width: 192px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const IntroText = styled.div`
  h1 {
    margin: 0;
    font-weight: normal;
    margin-bottom: 0rem;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: normal;
    opacity: 0.8;
  }
`;

const Contact = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }

  a {
    flex-grow: 1;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    li {
      background: var(--color-brand);
      padding: 0.2rem 0.8rem;
      border-radius: 4px;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const ExperienceList = styled.ul`
  list-style: none;
  padding: 0;

  h4,
  h5 {
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;

    &.faded {
      opacity: 0.8;
      font-style: italic;
    }
  }

  h5 {
    font-weight: normal;
  }

  h6 {
    font-size: 1.25rem;
    font-weight: normal;
    margin: 0;
  }

  > li {
    margin-bottom: 2rem;
  }

  .tasks {
    list-style: none;

    li:before {
      content: '-';
      text-indent: -1em;
      display: inline-block;
    }
  }
`;

const LanguageGrid = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;

  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1rem;

  h4 {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
  }
`;

const HireMe = styled.div`
  margin-top: 4rem;
  padding: 5rem;
  text-align: center;
  background: var(--color-border);
  border-radius: 1rem;

  h3 {
    margin-top: 0;
  }

  a {
    color: white;
    background: var(--color-brand);
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    transition: opacity 0.2s, box-shadow 0.2s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  padding: 2rem 2rem;
  border-top: 1px solid var(--color-border);

  p {
    margin: 0;
    margin-right: 1rem;
  }
`;

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: GitHub,
  Twitter: Twitter,
};

const SocialIcon: React.FC<{ network: keyof typeof socialIcons | string }> = ({
  network,
}) => {
  const Icon = socialIcons[network] || ExternalLink;
  return <Icon />;
};

const formatDate = (d?: string) =>
  d ? `${d.substr(5, 2)}/${d.substr(0, 4)}` : 'Present';

const CV: React.FC = () => {
  const { allProjectsYaml } = useStaticQuery(graphql`
    query {
      allProjectsYaml(sort: { fields: [date], order: DESC }) {
        nodes {
          name
          url
          date
          description
          languages
        }
      }
    }
  `);

  return (
    <Layout page="cv" title="CV" description={resume.basics.summary}>
      <Wrapper>
        <Intro>
          <div className="portrait">
            <Portrait />
          </div>
          <IntroText>
            <h1>{resume.basics.name}</h1>
            <h2>{resume.basics.label}</h2>
            <p>{resume.basics.summary}</p>
          </IntroText>
        </Intro>

        <Contact>
          <ContactDetail>
            <MapPin />
            <a href="https://www.google.com/maps/search/aachen" target="_blank">
              {resume.basics.location.city}, {resume.basics.location.countryCode}
            </a>
          </ContactDetail>
          <ContactDetail>
            <Mail />
            <a href={`mailto:${resume.basics.email}`}>{resume.basics.email}</a>
          </ContactDetail>
          <ContactDetail>
            <Phone />
            <a href={`tel:${resume.basics.phone}`}>{resume.basics.phone}</a>
          </ContactDetail>
          {resume.basics.profiles.map(p => (
            <ContactDetail title={p.network}>
              <SocialIcon network={p.network} />
              <a href={p.url} target="_blank">
                {p.username}
              </a>
            </ContactDetail>
          ))}
        </Contact>

        <h2>Technical Skills</h2>
        <SkillGrid>
          {resume.technicalSkills.map(s => (
            <div>
              <h4>{s.title}</h4>
              <ul>
                {s.content.map(c => (
                  <li>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </SkillGrid>

        <h2>Work Experience</h2>
        <ExperienceList>
          {resume.work.map(w => (
            <li>
              <h4>
                <a href={w.website} target="_blank">
                  {w.company}
                </a>
              </h4>
              <h5>
                {w.position} ({formatDate(w.startDate)} – {formatDate(w.endDate)})
              </h5>

              {w.summary && <p className="faded">{w.summary}</p>}

              <h6>Tasks / Highlights:</h6>
              <ul className="tasks">
                {w.highlights.map(h => (
                  <li>{h}</li>
                ))}
              </ul>
            </li>
          ))}
        </ExperienceList>

        <h2>Education</h2>
        <ExperienceList>
          {resume.education.map(e => (
            <li>
              <h4>
                {e.studyType}: {e.institution}
              </h4>
              <h5>{e.area}</h5>
              <p>
                {formatDate(e.startDate)} – {formatDate(e.endDate)} {'//'} GPA:{' '}
                {e.gpa}
              </p>
            </li>
          ))}
        </ExperienceList>

        <h2>Languages</h2>
        <LanguageGrid>
          {resume.languages.map(l => (
            <li>
              <h4>{l.language}</h4>
              <p>{l.fluency}</p>
            </li>
          ))}
        </LanguageGrid>

        <h2>Public Speaking</h2>
        <ExperienceList>
          {resume.publicSpeaking.map(s => (
            <li>
              <h4>
                <a href={s.link} target="_blank">
                  {s.title}
                </a>
              </h4>
              <p>
                {formatDate(s.date)} {'//'} {s.location}
              </p>
            </li>
          ))}
        </ExperienceList>

        <h2>Open Source Projects</h2>
        <ExperienceList>
          {allProjectsYaml.nodes.map(p => (
            <li>
              <h4>
                <a href={p.url} target="_blank">
                  {p.name}
                </a>
              </h4>
              <p>
                {formatDate(p.date)} {'//'} {p.languages.join(', ')}
              </p>
              <p>{p.description}</p>
            </li>
          ))}
        </ExperienceList>

        <h2>Publications</h2>
        <ExperienceList>
          {resume.publications.map(p => (
            <li>
              <h4>
                <a href={p.website} target="_blank">
                  {p.name}
                </a>
              </h4>
              <p>{formatDate(p.releaseDate)}</p>
              <p>{p.summary}</p>
            </li>
          ))}
        </ExperienceList>

        <HireMe>
          <h3>Like What You See?</h3>
          <a href="mailto:leo@leolabs.org">Hire Me 🚀</a>
        </HireMe>

        <Footer>
          <p>Made by Leo Bernard</p>
          <a
            download
            target="_blank"
            href="https://raw.githubusercontent.com/leolabs/leolabs-org/master/data/resume.json"
          >
            Download this CV as jsonResume
          </a>
        </Footer>
      </Wrapper>
    </Layout>
  );
};

export default CV;
