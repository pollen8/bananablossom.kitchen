import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface IProps {
  valid?: boolean;
}
const StyledInput = styled.input<IProps>`
  ${(props) => {
    if (props.valid === false) {
      return `border: 1px solid ${(props.theme.colors.red500)}`;
    }
    return ``;
  }}
`;

const Input = React.forwardRef<any, any>((props: HTMLAttributes<HTMLInputElement>, ref) => (
  <StyledInput ref={ref} type="text" {...props} />
));


export default Input;
