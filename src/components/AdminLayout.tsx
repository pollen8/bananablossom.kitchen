
import './layout.css';
import 'react-responsive-modal/styles.css';
import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

import { Link } from 'gatsby';
import React, {
  FC,
  useEffect,
} from 'react';
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';
import { createGlobalStyle } from 'styled-components';

import Fonts from '../lib/fonts';
import Button from './Button';
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
    font-display: swap;
    color: ${(props) => props.theme.colors.grey300};
  }
  table {
    font-size: 0.7rem;
    background-color: #fff;
  }
  `;
const Layout: FC = ({ children }) => {
  useEffect(() => {
    Fonts();
  }, []);

  const [dialog, setDialog] = React.useState(false)
  const title = "Banana Blossom, Eat like a Vietnamese";
  const identity = useIdentityContext()
  const name = identity?.user?.user_metadata?.full_name ?? '';
  const isLoggedIn = identity && identity.isLoggedIn;
  const isAdmin = (identity?.user?.app_metadata?.roles ?? []).includes('admin');
  return (
    <>
      <SEO title={title} />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
      <CardBody>
        <Logo />
        {
          isLoggedIn && isAdmin && <>
            <Link to="admin/products">Products</Link> |
            <Link to="admin/promotions">Promotions</Link> |
            <Link to="admin/orders">Orders</Link> |
            <Link to="admin/availability">Availability</Link> |
            <Link to="admin/notification">Notifications</Link>
            <img src="https://api.netlify.com/api/v1/badges/bc1199da-4265-4a8f-8bb6-5c84bba2a6bf/deploy-status" />
          </>
        }

        <div style={{ textAlign: 'right' }}>
          <Button onClick={() => setDialog(true)}>
            {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
          </Button>
        </div>
        {children}
      </CardBody>
      <hr />
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      <GlobalStyle />
    </>
  );
}

export default Layout;
