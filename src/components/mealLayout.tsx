
import './layout.css';

import { Link } from 'gatsby';
import React, {
  FC,
  useEffect,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Fonts from '../lib/fonts';
import CardBody from './CardBody';
import SEO from './seo';
import TopMenu from './TopMenu';

const GlobalStyle = createGlobalStyle<any>`
  html {
    font-size: 16px;
  }
  h1 {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
  h2 {
    font-size: 1.25rem;
    margin-bottom: 1.2rem;
  }
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  body {
    font-size: 0.75rem;
    font-family: 'Comfortaa', cursive;
    background: #eedd;
    color: ${(props) => props.theme.colors.grey300};
  }
  table {
    font-size: 0.57rem;
  }
  `;

const SubMenu = styled.ul`
  a {
    text-decoration: none;
  }

  [data-active-link],
  [aria-current] {
    color : ${(props) => props.theme.colors.primary};
    border: 0px solid transparent !important;
  }
  
`;

const Layout: FC = ({ children }) => {
  useEffect(() => {
    Fonts();
  }, []);


  const title = "Banana Blossom, Eat like a Vietnamese";

  return (
    <>
      <SEO title={title} />
      <TopMenu>
        <SubMenu>
          <li><Link to="/courses/starters">Starters</Link></li>
          <li><Link to="/courses/mains">Mains</Link></li>
          <li><Link to="/courses/sides">Sides</Link></li>
          <li><Link to="/courses/desserts">Desserts</Link></li>
        </SubMenu>
      </TopMenu>
      <CardBody>{children}</CardBody>
      <GlobalStyle />
    </>
  );
}

export default Layout;
