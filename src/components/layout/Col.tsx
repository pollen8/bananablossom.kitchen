import React from 'react';
import styled from 'styled-components';

interface ICol {
  xs?: number;
}
const Col = styled.div<ICol>`
  margin: 0 0.125rem;
  flex-grow: 1;
  ${(props) => {
    if (props.xs) {
      return `
      width: ${(props.xs / 12) * 100}%;
      `;
    }
    return `
    @media (min-width: 640px){
      flex-grow: 1;
    }
    `;
  }}
`;

export default Col;
