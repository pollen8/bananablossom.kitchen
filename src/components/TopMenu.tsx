import { Link } from 'gatsby';
import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import styled from 'styled-components';

import Button from './Button';
import Logo from './Logo';

const Menu = styled.div<{ scrolled: boolean }>`
  background-color: rgba(255,255,255,1);
  padding: 1rem;
  display: flex;
  position: sticky;
  z-index:100;
  box-shadow: 0 7px 14px 0 rgba(60,66,87, 0.12), 0 3px 6px 0 rgba(0,0,0, 0.12);
  top: 0;
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    
    li {
      margin: 0.5rem;
    }
  }
  a {
    color: #16311D;
  }
  .gatsby-image-wrapper {
    transition: all 500ms ease;
    margin-right: 2.5rem;
  }
  ${(props) => {
    if (props.scrolled) {
      return `.gatsby-image-wrapper {
        width: 125px !important;
        height: 75px !important;
      }`;
    }
    return ``;
  }}
  @media (max-width: 640px){
    .gatsby-image-wrapper {
      width: 135px !important;
      height: 75px !important;
    }
  }
`;

interface IBurger {
  show: boolean;
}
const Burger = styled.div<IBurger>`
flex-grow: 1;
justify-content: start;
display: flex;
margin-top: 1.1rem;
position: relative;
#burger-btn { 
  height: 2.2rem;
  display: none;
  
}
  @media (max-width: 640px){
    justify-content: end;
    #burger-btn {
      display: block;
    }
    ul {
      background-color: #fff;
      display: ${(props) => props.show ? 'block' : 'none'};
      position: absolute;
      border-radius: 0.3rem;
      box-shadow: 0 7px 14px 0 rgba(60,66,87, 0.12), 0 3px 6px 0 rgba(0,0,0, 0.12);
      top: 2.2rem;
      right: 0;

      [aria-current] {
        color : ${(props) => props.theme.colors.primary};
        border: 0px solid transparent !important;
      }

    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 2rem;
  display: block; 
  padding: 0.1rem;
  font-size: 1.2rem;
  transition: all 500ms ease;
  &:hover {
    color : ${(props) => props.theme.colors.primary};
    border-color : ${(props) => props.theme.colors.primary} !important;
  }
`;

const activeStyle = { borderBottom: '3px solid #F5728E' };

const TopMenu: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  const [show, toggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const watchScroll = (e: any) => {
      setScrolled(window.pageYOffset > 200);
    }
    window && window.addEventListener("scroll", watchScroll);
    return () => window && window.removeEventListener('scroll', watchScroll);
  }, [])
  return <Menu {...rest}
    scrolled={scrolled}>
    <Link to="/">
      <Logo alt="Banana Blossom - Eat like a vietnamese" />
    </Link>
    <Burger
      show={show}>
      <Button id="burger-btn"

        onClick={() => {
          toggle(!show);
        }}>
        <AiOutlineMenu />
      </Button>
      <ul>
        <li>
          <StyledLink to="/"
            activeStyle={activeStyle}>
            Menu
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/contact"
            activeStyle={activeStyle}>
            Contact us
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/info"
            activeStyle={activeStyle}>
            Info
          </StyledLink>
        </li>
      </ul>
    </Burger>
  </Menu>
}

export default TopMenu;
