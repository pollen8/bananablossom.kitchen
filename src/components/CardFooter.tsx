import React, { FC } from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardFooter: FC = (props) => {
  return <Footer>
    {props.children}
  </Footer>

}
export default CardFooter;
