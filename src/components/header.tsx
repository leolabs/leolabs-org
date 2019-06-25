import { styled } from 'linaria/react';
import { dimensions } from '../util/theme';
import React from 'react';
import { Link } from 'gatsby';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10;
`;

const Container = styled.div`
  margin: auto;
  max-width: ${dimensions.maxWidth};
  display: flex;
  align-items: center;
  padding: 2rem 3rem;

  @media (max-width: 700px) {
    padding: 1rem 1.3rem;
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${dimensions.fontSizes.h4};
`;

const Menu = styled.nav`
  margin-left: auto;
  list-style: none;
  display: flex;
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: 2rem;

  opacity: 0.5;
  transition: opacity 0.2s;

  &.active,
  &:hover {
    opacity: 1;
  }
`;

export const Header: React.FC = () => (
  <StyledHeader>
    <Container>
      <Title to="/">Hi, I'm Leo.</Title>
      <Menu>
        <MenuItem to="/" activeClassName="active">
          About Me
        </MenuItem>
        <MenuItem to="/blog" activeClassName="active">
          Blog
        </MenuItem>
      </Menu>
    </Container>
  </StyledHeader>
);
