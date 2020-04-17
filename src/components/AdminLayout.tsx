
import './layout.css';

import React, {
  FC,
  useEffect,
} from 'react';
import { createGlobalStyle } from 'styled-components';

import Fonts from '../lib/fonts';
import CardBody from './CardBody';
import Logo from './Logo';
import SEO from './seo';

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
    background-color: #fff;
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

      <CardBody>
        <Logo />
        {children}</CardBody>
      <GlobalStyle />
    </>
  );
}

export default Layout;
