import React, { FC } from 'react';
import {
  AiOutlineCar,
  AiOutlineHome,
} from 'react-icons/ai';
import { useTheme } from 'styled-components';

import { ICheckoutConfig } from '../../pages/checkout';
import BigCheckbox from '../ui/BigCheckbox';

export type TDeliveryOptions = 'pickup' | 'delivery';

interface IProps {
  selected: TDeliveryOptions;
  toggle: (selected: TDeliveryOptions) => void;
  total: number;
  checkoutConfig: ICheckoutConfig;
}

const DeliveryOptions: FC<IProps> = ({
  selected,
  total,
  toggle,
  checkoutConfig,
}) => {
  const { deliveryFreeFrom } = checkoutConfig;
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0.25rem 0' }}>
      <BigCheckbox
        onClick={() => toggle('pickup')}
        label="Pick up"
        active={selected === 'pickup'}
      >
        <AiOutlineHome size="2rem" />
      </BigCheckbox>
      <BigCheckbox
        disabled={total < deliveryFreeFrom}
        title={total < deliveryFreeFrom ? `Delivery available for orders over £${deliveryFreeFrom}.00` : ''}
        onClick={() => total >= deliveryFreeFrom && toggle('delivery')}
        label="Delivered"
        active={selected === 'delivery'}
      >
        <AiOutlineCar size="2rem" color={total < deliveryFreeFrom ? theme.colors.grey500 : theme.colors.grey300} />
      </BigCheckbox>
    </div>
  );
};

export default DeliveryOptions;
