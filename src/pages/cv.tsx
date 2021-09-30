import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

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

  .faded {
    opacity: 0.8;
    font-style: italic;
  }

  > section {
    margin-top: 6rem;

    > h2 {
      page-break-after: avoid;

      &:after {
        content: '';
        display: block;
        width: 10rem;
        height: 0;
        box-shadow: 0 0 0 1px currentColor;
        margin-top: 0.5rem;
      }
    }
  }

  .print-shown {
    display: none;
  }

  @media print {
    zoom: 0.85;

    .print-hidden {
      display: none;
    }

    .print-shown {
      display: flex;
      margin-top: 10rem;
    }

    > section {
      margin-top: 3rem;
    }
  }
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: 10em 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;

  .portrait {
    width: 10em;

    img {
      width: 100%;
      border-radius: 1000px;
    }
  }

  @media only screen and (max-width: 35rem) {
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
  background: var(--color-border);
  border-radius: 0.5rem;

  @media (max-width: 35rem) {
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
  page-break-before: avoid;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));

  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    li {
      background: var(--color-brand);
      color: white;
      padding: 0.2rem 0.8rem;
      border-radius: 4px;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const ExperienceList = styled.ul`
  page-break-before: avoid;
  list-style: none;
  padding: 0;

  h4,
  h5 {
    margin: 0;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;
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
    page-break-inside: avoid;
  }

  .tasks {
    list-style: none;

    li:before {
      content: '-';
      text-indent: -1.25em;
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
  }

  p {
    margin: 0;
  }
`;

const Quote = styled.blockquote`
  line-height: 1.5;
  font-size: 1.25rem;

  margin-left: 0;
  margin-right: 0;
  margin-bottom: 2rem;

  padding-left: 1rem;
  border-left: 4px solid var(--color-border);

  span {
    opacity: 0.8;
    display: block;
    font-style: italic;
  }
`;

const HireMe = styled.div`
  margin-top: 4rem;
  padding: 5rem;
  text-align: center;
  background: var(--color-border);
  border-radius: 1rem;
  page-break-inside: avoid;

  h3 {
    margin-top: 0;
  }

  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(0, 188, 117, 0.4);
      box-shadow: 0 0 0 0 rgba(0, 188, 117, 0.4);
    }
    100% {
      -moz-box-shadow: 0 0 0 10px rgba(0, 188, 117, 0);
      box-shadow: 0 0 0 10px rgba(0, 188, 117, 0);
    }
  }

  a {
    display: inline-block;
    position: relative;
    color: white;
    background: var(--color-brand);
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    transition: opacity 0.5s, box-shadow 0.5s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    :after {
      display: block;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }

    &:hover {
      :after {
        animation: pulse 1s;
      }
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4rem;
  padding: 2rem 1rem;
  box-sizing: border-box;

  border-top: 1px solid var(--color-border);

  p {
    margin: 0;
  }
`;

const Header = styled.header`
  justify-content: space-between;
  margin-bottom: 2rem;
  opacity: 0.8;

  display: none;

  @media print {
    display: flex;
    position: fixed;
    bottom: -2rem;
    width: 100%;
    box-sizing: border-box;
  }

  p {
    margin: 0;
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
        <Header>
          <p>Updated: 2021-09-30</p>
          <p>
            View the CV online at{' '}
            <a href="https://leolabs.org/cv">https://leolabs.org/cv</a>
          </p>
        </Header>

        <Intro>
          <div className="portrait">
            <img src={resume.basics.picture} alt="Profile Picture" />
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
          {resume.basics.profiles.map((p) => (
            <ContactDetail title={p.network}>
              <SocialIcon network={p.network} />
              <a href={p.url} target="_blank">
                {p.username}
              </a>
            </ContactDetail>
          ))}
        </Contact>

        <section>
          <h2>Technical Skills</h2>
          <SkillGrid>
            {resume.technicalSkills.map((s) => (
              <div>
                <h4>{s.title}</h4>
                <ul>
                  {s.content.map((c) => (
                    <li>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </SkillGrid>
        </section>

        <section>
          <h2>Work Experience</h2>
          <ExperienceList>
            {resume.work.map((w) => (
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
                  {w.highlights.map((h) => (
                    <li>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ExperienceList>
        </section>

        <section>
          <h2>Education</h2>
          <ExperienceList>
            {resume.education.map((e) => (
              <li>
                <h4>
                  {e.studyType}: {e.institution}
                </h4>
                <h5>{e.area}</h5>
                <p className="faded">
                  {formatDate(e.startDate)} – {formatDate(e.endDate)} {'//'} GPA:{' '}
                  {e.gpa}
                </p>
              </li>
            ))}
          </ExperienceList>
        </section>

        <section>
          <h2>Languages</h2>
          <LanguageGrid>
            {resume.languages.map((l) => (
              <li>
                <h4>{l.language}</h4>
                <p className="faded">{l.fluency}</p>
              </li>
            ))}
          </LanguageGrid>
        </section>

        <section style={{ pageBreakBefore: 'always' }}>
          <h2>Public Speaking</h2>
          <ExperienceList>
            {resume.publicSpeaking.map((s) => (
              <li>
                <h4>
                  <a href={s.link} target="_blank">
                    {s.title}
                  </a>
                </h4>
                <p className="faded">
                  {formatDate(s.date)} {'//'} {s.location}
                </p>
              </li>
            ))}
          </ExperienceList>
        </section>

        <section>
          <h2>Projects</h2>
          <ExperienceList>
            {allProjectsYaml.nodes.map((p) => (
              <li>
                <h4>
                  <a href={p.url} target="_blank">
                    {p.name}
                  </a>
                </h4>
                <p className="faded">
                  {formatDate(p.date)} {'//'} {p.languages.join(', ')}
                </p>
                <p>{p.description}</p>
              </li>
            ))}
          </ExperienceList>
        </section>

        <section>
          <h2>Publications</h2>
          <ExperienceList>
            {resume.publications.map((p) => (
              <li>
                <h4>
                  <a href={p.website} target="_blank">
                    {p.name}
                  </a>
                </h4>
                <p className="faded">{formatDate(p.releaseDate)}</p>
                <p>{p.summary}</p>
              </li>
            ))}
          </ExperienceList>
        </section>

        <section>
          <h2>What It's like to Work with Me</h2>
          {resume.quotes.map((q) => (
            <Quote>
              {q.text}
              <span>— {q.author}</span>
            </Quote>
          ))}
        </section>

        <HireMe className="print-hidden">
          <h3>Like What You See?</h3>
          <a href="mailto:leo@leolabs.org">Hire Me 🚀</a>
        </HireMe>

        <Footer className="print-hidden">
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
