import styled from 'styled-components';

interface IProps {
  text?: boolean;
}
export default styled.label<IProps>`
  display: block;
  margin: 0.5rem 0 0.3rem 0;
  ${(props) => {
    if (!props.text) {
      return '';
    }
    return `
      text-transform: uppercase;
      font-size: 0.7rem;
      color: ${props.theme.colors.grey500};
    `;
  }}
`;