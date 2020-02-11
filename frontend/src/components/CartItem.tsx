import React, {
  FC,
  useContext,
} from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import { ButtonIcon } from './Button';
import { ISku } from './MealList';

interface IProps {
  item: ISku;
  readonly: boolean;
}

const CartItem: FC<IProps> = ({
  item,
  readonly,
}) => {
  const { dispatch } = useContext(store);
  return (
    <>
      <div>{item.product.name}</div>
      <div>{item.quantity}</div>
      <div>{formatter.format(item.quantity / 100 * item.price)}</div>
      {readonly && <div />}
      {
        !readonly &&
        <ButtonIcon
          onClick={() => dispatch({ type: 'CART_REMOVE', item })}>
          <AiOutlineMinusCircle />
        </ButtonIcon>
      }
    </>
  )
}

export default CartItem;
