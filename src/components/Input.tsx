import styled, { ThemedStyledProps } from 'styled-components';

interface IProps {
  valid?: boolean;
}

const valid = (props: ThemedStyledProps<any, any>) => {
  if (props.valid === false) {
    return `border: 1px solid ${(props.theme.colors.red500)}`;
  }
  return ``;
}

export const inputStyle = (props: ThemedStyledProps<any, any>) => {
  return `
  border-radius: 2px;
  padding: 0.125rem 0.4rem;
  border 1px solid ${props.theme.colors.grey700};
  &:focus {
    border 1px solid ${props.theme.colors.blue500};
  }
  ${valid(props)};
  `;
}

const StyledInput = styled.input<IProps>`
  ${(props) => inputStyle(props)};
`;

export default StyledInput;
