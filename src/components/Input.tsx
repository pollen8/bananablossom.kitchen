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

export default StyledInput;
