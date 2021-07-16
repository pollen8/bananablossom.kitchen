import styled from 'styled-components';

interface Props {
  gridTemplate?: string;
  columnGap?: string;
}
export const Grid = styled.div<Props>`
display: grid;
${(props) => props.gridTemplate && `grid-template: ${props.gridTemplate}`};
${(props) => props.columnGap && `grid-column-gap: ${props.columnGap}`};
`;
