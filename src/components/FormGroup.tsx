import React, {
  FC,
  HTMLAttributes,
} from 'react';
import styled from 'styled-components';

const Group = styled.div<{ check?: boolean }>`
  display: ${(props) => props.check ? 'flex' : 'block'};
`;

const FormGroup: FC<HTMLAttributes<HTMLDivElement> & { check?: boolean }> = (props) => {
  const { children, ...rest } = props;
  return <Group {...rest}>{children}</Group>
}

export default FormGroup;
