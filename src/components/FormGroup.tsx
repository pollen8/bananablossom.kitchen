import React, {
  FC,
  HTMLAttributes,
} from 'react';

const FormGroup: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>
}

export default FormGroup;
