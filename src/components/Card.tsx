import React, {
  FC,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  box-shadow: 0 7px 14px 0 rgba(60,66,87, 0.12), 0 3px 6px 0 rgba(0,0,0, 0.12);
  border-radius: 0.3rem;
  background-color: rgb(255, 255, 255);
`;

const Card: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  return <StyledCard {...rest}>
    {children}
  </StyledCard>

}
export default Card;
