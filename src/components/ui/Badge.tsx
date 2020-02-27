import styled from 'styled-components';

const B = styled.div<{ background?: string, color?: string }>`
  background-color: ${(props) => props.background
    ? props.theme.colors[props.background]
    : props.theme.colors.blue400
  };
  color: ${(props) => props.color
    ? props.theme.colors[props.color]
    : props.theme.colors.white100};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  display: inline-block;
  margin-right: 0.3rem;
  line-height: 1.5rem;
  text-align: center;
  font-size: 0.65rem;
  font-weight: bold;
`;


export default B;

