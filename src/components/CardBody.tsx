import React, {
  FC,
  HTMLAttributes,
} from 'react';

const CardBody: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, style, ...rest } = props;
  return <div style={{ padding: '1rem', ...style }} {...rest}>
    {children}
  </div>

}
export default CardBody;
