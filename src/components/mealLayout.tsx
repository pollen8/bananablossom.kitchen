
import './layout.css';

import React, {
  FC,
  useEffect,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Fonts from '../lib/fonts';
import MobileCheckoutPane from './MobileCheckoutPane';
import Notifications from './Notifications';
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
    font-size: 1.1rem;
    margin-bottom: 0.9rem;
  }
  body {
    font-size: 0.75rem;
    font-family: 'Comfortaa', cursive;
    background: #eedd;
    font-display: swap;
    color: ${(props) => props.theme.colors.grey300};
    
  }


    html,
    #___gatsby,
    #gatsby-focus-wrapper,
    body {
      height: 100%;
    }
 
 
  table {
    font-size: 0.67rem;
  }
  `;

export const SubMenu = styled.ul`
  a {
    text-decoration: none;
  }

  [data-active-link],
  [aria-current] {
    color : ${(props) => props.theme.colors.primary};
    border: 0px solid transparent !important;
  }
  
`;

const Page = styled.div`
  height: 100%; 
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
flex: 0 0 auto;
z-index: 888;
`;

const PageContent = styled.div`
  flex: 1 1 auto;
  position: relative;
  overflow-y: auto;
`;

const PageFooter = styled.div`
flex: 0 0 auto;
  background-color: #dcdcdc;
  `;

const Layout: FC = ({ children }) => {
  useEffect(() => {
    Fonts();
  }, []);


  const title = "Banana Blossom, Eat like a Vietnamese";

  return (
    <Page>
      <SEO title={title} />

      <PageHeader>
        <TopMenu />
      </PageHeader>
      <PageContent>
        {children}
      </PageContent>
      <PageFooter>
        <MobileCheckoutPane />
      </PageFooter>
      <Notifications />
      <GlobalStyle />
    </Page>
  );
}

export default Layout;
