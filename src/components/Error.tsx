import styled from 'styled-components';

const Error = styled.div`
  color: ${(props) => props.theme.colors.red500};
  font-weight: bold;
  font-size: 0.65rem;
  margin-bottom: 0.25rem;
`;

export default Error;