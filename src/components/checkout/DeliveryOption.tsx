import React, { FC } from 'react';
import {
  AiOutlineBorder,
  AiOutlineCheckSquare,
} from 'react-icons/ai';

import { ButtonIcon } from '../Button';

export type TDeliveryOptions = 'pickup' | 'delivery';
interface IProps {
  selected: TDeliveryOptions;
  toggle: (selected: TDeliveryOptions) => void;
}

const DeliveryOptions: FC<IProps> = ({
  selected,
  toggle,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.25rem 0', width: '15rem' }}>
      <div>
        <ButtonIcon
          active={selected === 'pickup'}
          onClick={() => toggle('pickup')}
        >
          {
            selected === 'pickup'
              ? <AiOutlineCheckSquare />
              : <AiOutlineBorder />
          }
          <div>
            Pick up
            </div>
        </ButtonIcon>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ButtonIcon
          active={selected === 'delivery'}
          onClick={() => toggle('delivery')}>
          {
            selected === 'delivery'
              ? <AiOutlineCheckSquare />
              : <AiOutlineBorder />
          }
          Delivered</ButtonIcon>
      </div>
    </div>
  );
};

export default DeliveryOptions;