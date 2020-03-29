
import './layout.css';

import {
  graphql,
  Link,
  useStaticQuery,
} from 'gatsby';
import React, {
  FC,
  useEffect,
} from 'react';
import { createGlobalStyle } from 'styled-components';

import Fonts from '../lib/fonts';
import Button from './Button';
import CardBody from './CardBody';
import Logo from './Logo';
import SEO from './seo';
import TopMenu from './TopMenu';

const GlobalStyle = createGlobalStyle<any>`
  html {
    font-size: 16px;
  }
  h1: {
    font-size: 1.2rem;
    color: red;
  }
  body {
    font-size: 0.8rem;
    font-family: 'Comfortaa', cursive;
    background: #eedd;
    color: ${(props) => props.theme.colors.grey300};
  }
  table {
    font-size: 0.8rem;
  }
  `;

const Layout: FC = ({ children }) => {
  useEffect(() => {
    Fonts();
  }, []);


  const title = "Banana Blossom, Eat like a Vietnamese";
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <SEO title={title} />
      <TopMenu>
        <Link to="/">
          <Logo alt={title} />

        </Link>
        {/* <li>
            <Link to="/meals">
              <>
                <Button>Meals</Button>
              </>
            </Link>
          </li> */}
        <li>
          <Link to="/contact">
            <>
              <Button>Contact us</Button>
            </>
          </Link>
        </li>
        <li>
          <Link to="/info">
            <>
              <Button>Info</Button>
            </>
          </Link>
        </li>
        {/* <li>
            <Link to="/about-us">
              <>
                <Button>Our story</Button>
              </>
            </Link>
          </li> */}
      </TopMenu>
      <CardBody>{children}</CardBody>
      <GlobalStyle />
    </>
  );
}

export default Layout;
