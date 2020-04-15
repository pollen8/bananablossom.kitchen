import styled from 'styled-components';

const FormFooter = styled.div<{ align?: 'left' | 'right' }>`
  margin-top: 1rem;
  text-align: ${(props) => props.align ?? 'right'};
`;

export default FormFooter;
