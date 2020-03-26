import React, {
  FC,
  HTMLAttributes,
} from 'react';
import {
  AiOutlineBorder,
  AiOutlineCar,
  AiOutlineCheckSquare,
  AiOutlineHome,
} from 'react-icons/ai';
import styled, { useTheme } from 'styled-components';

import { ButtonIcon } from '../Button';

export type TDeliveryOptions = 'pickup' | 'delivery';

interface IProps {
  selected: TDeliveryOptions;
  toggle: (selected: TDeliveryOptions) => void;
  total: number;

}

const Option = styled.div<{ disabled?: boolean } & HTMLAttributes<HTMLDivElement>>`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'default'}
  &:hover: {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }

  button div {
    margin-left: 0.5rem;
  }
`;

export const deliveryFreeFrom = 15;

const DeliveryOptions: FC<IProps> = ({
  selected,
  total,
  toggle,
}) => {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0.25rem 0' }}>
      <Option
        disabled={false}
        onClick={() => toggle('pickup')}>
        <AiOutlineHome size="2rem" />
        <ButtonIcon
          type="button"
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
      </Option>
      <Option
        title={total < deliveryFreeFrom ? `Delivery available for orders over £${deliveryFreeFrom}.00` : ''}
        disabled={total < deliveryFreeFrom}
        onClick={() => total >= deliveryFreeFrom && toggle('delivery')}>
        <AiOutlineCar size="2rem" color={total < deliveryFreeFrom ? theme.colors.grey500 : theme.colors.grey300} />
        <ButtonIcon
          type="button"
          disabled={total < deliveryFreeFrom}
          active={selected === 'delivery'}
          onClick={() => total >= deliveryFreeFrom && toggle('delivery')}>
          {
            selected === 'delivery'
              ? <AiOutlineCheckSquare />
              : <AiOutlineBorder />
          }

          <div>
            Delivered
            </div>
        </ButtonIcon>
      </Option>
    </div>
  );
};

export default DeliveryOptions;
