import styled from 'styled-components';

export default styled.div<{ color: 'danger' | 'info' }>`
  padding: 0.5rem 2rem;
  
  ${(props) => {
    if (props.color === 'info') {
      return `
      border: 1px solid ${props.theme.colors.blue400};
      background-color: ${props.theme.colors.blue800};
      color: ${props.theme.colors.blue100};
      `;
    }
    return `
    background: rgb(240, 225, 225);
    border: 1px solid rgba(140,100,100, 0.4);
    color: rgb(140,100,100);
    `;
  }}
 
  border-radius: 0.3rem;
`;