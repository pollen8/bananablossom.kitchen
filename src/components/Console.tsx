import React, { FC } from 'react';

export const Console: FC = ({ children }) => {
  console.log(children);
  return null;
}
