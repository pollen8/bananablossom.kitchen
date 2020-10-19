import { Link } from 'gatsby';
import React, {
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import Button from './Button';
import Logo from './Logo';
import { SubMenu } from './mealLayout';
import Pill from './ui/Pill';

const Menu = styled.div<{ scrolled: boolean }>`
  background-color: rgba(255,255,255,1);
  padding: 0.75rem 1rem 0 0.75rem;
  display: flex;
  z-index:100;
  box-shadow: 0 1px 3px 0 rgba(60,66,87, 0.12), 0 3px 6px 0 rgba(0,0,0, 0.12);
  ul {
    list-style: none;
    z-index: 999;
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
  img,
  > div > div, 
  > div  >div > ul a,
  > div  >div > ul li,
  > div  >div > ul a {
    transition: all 300ms ease;
  }
  img {
    margin-bottom: 0;
    margin-right: 2.5rem;
    height: 75px !important;
  }
  > div > div {
    margin-top: 1.1rem;
  }
  > div  >div > ul a{
    font-size: 1rem;
  }
  > div  >div > ul li {
    margin-top: 0.2rem;
  }
  > div  >div > ul a{
    font-size: 0.8rem;
  }

  @media (max-width: 640px){
    img {
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

  > ul > ul {
    position: absolute;
    bottom: -2.4rem;
  }
  @media (max-width: 640px){
    justify-content: end;
    #burger-btn {
      display: block;
    }
    > ul {
      background-color: #fff;
      display: ${(props) => props.show ? 'block' : 'none'};
      position: absolute;
      border-radius: 0.3rem;
      box-shadow: 0 7px 14px 0 rgba(60,66,87, 0.12), 0 3px 6px 0 rgba(0,0,0, 0.12);
      top: 2.2rem;
      right: 0;

      [data-active-link],
      [aria-current] {
        color : ${(props) => props.theme.colors.primary};
        border: 0px solid transparent !important;
      }
    }

    > ul > ul  {
      position: initial;
      display: block;
      li {
        display: block;
        width: 100%;
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
  display: flex;
  align-items: center;
`;

const CartPill = styled(Pill)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  margin-left: 0.6rem;
`;

const activeStyle = { borderBottom: '3px solid #F5728E' };

const isPartiallyActive = (props) => {
  const active = props.location.pathname.includes('/courses');
  return active ?
    {
      'data-active-link': true,
      'style': activeStyle,
    } : {};
}


const TopMenu: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  const [show, toggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useContext(store);

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
    <div style={{ width: '60%' }}>
      <Burger
        show={show}>
        <Button id="burger-btn"
          aria-label="menu"
          onClick={() => {
            toggle(!show);
          }}>
          <AiOutlineMenu />
        </Button>
        <ul>
          <li>
            <StyledLink to="/"
              activeClassName="active"
              activeStyle={activeStyle}
            >Home
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/pre-order"
              activeClassName="active"
              activeStyle={activeStyle}
            >Pre-order
            </StyledLink>
          </li>
          {/* <li>
            <StyledLink to="/courses/mains"
              activeClassName="active"
              getProps={isPartiallyActive}
              activeStyle={activeStyle}
            >
              Menu
          </StyledLink>
          </li> */}
          {/* <SubMenu>
            <li><Link to="/courses/starters">Starters</Link></li>
            <li><Link to="/courses/mains">Mains</Link></li>
            <li><Link to="/courses/sides">Sides</Link></li>
            <li><Link to="/courses/desserts">Desserts</Link></li>
          </SubMenu> */}
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
          {/* <li>
            <StyledLink to="/markets"
              activeStyle={activeStyle}>
              Markets
          </StyledLink>
          </li> */}
          <li>
            <StyledLink to="/cart"
              activeStyle={activeStyle}>
              <div>Cart</div>
              <CartPill>{state.items.length}</CartPill>
            </StyledLink>
          </li>
        </ul>

      </Burger>
      {children}
    </div>
  </Menu>
}

export default TopMenu;
