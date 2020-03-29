import React, {
  FC,
  InputHTMLAttributes,
  RefAttributes,
} from 'react';

const TextArea: FC<InputHTMLAttributes<HTMLTextAreaElement> & RefAttributes<any>> = (props) => {
  const { children, ...rest } = props;
  return <textarea type="text" {...props} style={{ width: '100%' }} />

}
export default TextArea;
