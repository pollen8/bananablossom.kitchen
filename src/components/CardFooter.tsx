import styled from 'styled-components';

const Footer = styled.div<{ direction?: 'column' | 'row' }>`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => props.direction};
`;

export default Footer;
