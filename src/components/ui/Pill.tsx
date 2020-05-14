import styled from 'styled-components';

const Pill = styled.div<{ background?: string, color?: string }>`
  background-color: ${(props) => props.background
    ? props.theme.colors[props.background]
    : props.theme.colors.blue400
  };
  color: ${(props) => props.color
    ? props.theme.colors[props.color]
    : props.theme.colors.white100};
  height: 1.5rem;
  padding:0 0.3rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin-right: 0.3rem;
  line-height: 1.5rem;
  text-align: center;
  font-size: 0.65rem;
  font-weight: bold;
`;


export default Pill;

