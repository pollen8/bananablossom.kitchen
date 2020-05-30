import React, {
  FC,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

const Body = styled.div`
@media (min-width: 640px){ 
  padding: 1rem;
}

@media (max-width: 640px){ 
 padding: 0.3rem;
}
`;
const CardBody: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, style, ...rest } = props;
  return <Body style={{ ...style }} {...rest}>
    {children}
  </Body>

}
export default CardBody;
