import styled from 'styled-components';

interface IProps {
  text?: boolean;
  check?: boolean;
}
export default styled.label<IProps>`
  display: block;
  margin: ${(props) => props.check ? 0 : '.5rem 0 0.3rem 0'};
  padding-left: ${(props) => props.check ? '0.5rem' : '0'};
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
