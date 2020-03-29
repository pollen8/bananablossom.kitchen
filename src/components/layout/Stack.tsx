import styled from 'styled-components';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 1rem 0; 
  }
  @media (min-width: 640px){ 
    flex-direction: row;

    > * {
      flex-grow: 1;
      margin: 0 1rem;
    }
    > *:first-child {
      margin-left: 0;
    }
    > *:last-child {
      margin-right: 0;
    }
  }
`;

export default Stack;
