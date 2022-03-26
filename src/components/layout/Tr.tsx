import styled from 'styled-components';

export const Tr = styled.tr`
cursor: pointer;
 &:hover {
   background-color: ${(props) => props.theme.colors.blue900};
 }
`;
