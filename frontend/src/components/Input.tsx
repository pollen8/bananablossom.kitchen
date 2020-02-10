import React, { HTMLAttributes } from 'react';

const Input = React.forwardRef<any, any>((props: HTMLAttributes<HTMLInputElement>, ref) => (
  <input ref={ref} type="text" {...props} />
));


export default Input;
