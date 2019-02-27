import styled from '../util/styled-components';
import React from 'react';
import { Link } from 'gatsby';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  margin: auto;
  max-width: ${p => p.theme.dimensions.maxWidth};
  padding: 2rem;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${p => p.theme.fontSizes.h4};
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
`;

export const Header: React.FC = () => (
  <StyledHeader>
    <Title to="/">Hi, I'm Leo.</Title>
    <Menu>
      <MenuItem to="/" activeClassName="active">
        About Me
      </MenuItem>
      <MenuItem to="/blog" activeClassName="active">
        Blog
      </MenuItem>
    </Menu>
  </StyledHeader>
);
