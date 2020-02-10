import React, {
  FC,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

const Menu = styled.div`
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
`;

const TopMenu: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  return <Menu {...rest}>
    <ul>
      {children}
    </ul>
  </Menu>
}

export default TopMenu;
