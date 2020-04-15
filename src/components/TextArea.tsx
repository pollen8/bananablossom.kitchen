import React, {
  FC,
  InputHTMLAttributes,
  RefAttributes,
} from 'react';
import styled from 'styled-components';

import { inputStyle } from './Input';

const StyledTextArea = styled.textarea`
  ${(props) => inputStyle(props)};
`;
const TextArea: FC<InputHTMLAttributes<HTMLTextAreaElement> & RefAttributes<any>> = (props) => {
  const { children, ...rest } = props;
  return <StyledTextArea {...props} style={{ width: '100%' }} />

}
export default TextArea;
