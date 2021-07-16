import React, { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
}
export const Spacer: FC<Props> = ({
  width,
  height,
}) => height
    ? <div style={{ height }} />
    : <div style={{ width, display: 'inline-block' }} />
