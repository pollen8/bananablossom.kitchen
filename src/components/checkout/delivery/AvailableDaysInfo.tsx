import React, { FC } from 'react';

import { IOrder } from '../../../pages/checkout';
import Pill from '../../ui/Pill';

interface IProps {
  availableDays: Set<string>;
  delivery: IOrder['delivery'];
}

const AvailableDaysInfo: FC<IProps> = ({
  availableDays,
  delivery,
}) => {
  if (availableDays.size === 0) {
    return null;
  }
  return (
    <>
      {
        delivery === 'pickup'
          ? 'You can only pick up on: '
          : 'We deliver on the following days: '
      } {Array.from(availableDays).map((d) => <Pill
        background="blue800"
        color="grey200" key={d}>{d}</Pill>)}
    </>
  )
}

export default AvailableDaysInfo;
