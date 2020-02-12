
import { Link } from 'gatsby';
import React from 'react';

// import { unsetToken } from '../lib/auth';
import Fonts from '../lib/fonts';
import Button from './Button';
import CardBody from './CardBody';
import Logo from './Logo';
import TopMenu from './TopMenu';

interface IProps {
  isAuthenticated?: boolean;
  loggedUser?: any;
}

class Layout extends React.Component<IProps, any> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Fonts();
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    console.log('pageProps', pageProps);
    const isAuthenticated = true;
    return { pageProps, isAuthenticated };
  }

  render() {
    const { isAuthenticated, children, loggedUser } = this.props;
    const title = "Banana Blossom, Eat like a Vietnamese";
    return (
      <div>
        <header>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

        </header>
        <header>
          <style jsx global>
            {`
            html {
              font-size: 16px;
            }
            body {
              padding: 0;
              margin: 0;
              font-size: 0.8rem;
              font-family: 'Comfortaa', cursive;
              background-size: contain;
              // background: transparent url('http://localhost:1337/pho2.jpg');
              background-repeat: none;
              background-attachment: fixed;
              background-size: 100%;
              //background-color: #DBE7E4;

              // background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(156.83deg, #E04869 30.2%, rgba(110, 93, 217, 0.26) 69.29%, rgba(219, 231, 228, 0.92) 101.19%);
              background: #eedd;
            }
            `}
          </style>

        </header>
        <TopMenu>
          <Link to="/">
            <Logo />

          </Link>
          <li>
            <Link to="/meals">
              <>
                <Button>Meals</Button>
              </>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <>
                <Button>Special requests</Button>
              </>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <>
                <Button>Our story</Button>
              </>
            </Link>
          </li>
        </TopMenu>
        <CardBody>{children}</CardBody>
      </div>
    );
  }
}

export default Layout;