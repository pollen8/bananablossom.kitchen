import styled from 'styled-components';

const FormFooter = styled.div<{ align?: 'left' | 'right' | 'space-between' }>`
  margin-top: 1rem;
  display: flex;
  justify-content: ${(props) => props.align ?? 'end'};
  text-align: ${(props) => props.align ?? 'right'};
`;

export default FormFooter;
