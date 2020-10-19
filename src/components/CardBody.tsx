import React, {
  FC,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

const Body = styled.div`
  padding: 1rem;
`;

const CardBody: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, style, ...rest } = props;
  return <Body style={{ ...style }} {...rest}>
    {children}
  </Body>
}

export default CardBody;
