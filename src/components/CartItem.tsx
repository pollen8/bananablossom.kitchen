import React, {
  FC,
  useContext,
} from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import {
  ICartItem,
  store,
} from '../context/cartContext';
import { formatter } from '../lib/formatter';
import { ButtonIcon } from './Button';
import Pill from './ui/Pill';

interface IProps {
  item: ICartItem;
  readonly: boolean;
}

const CartItem: FC<IProps> = ({
  item,
  readonly,
}) => {
  const { name, price } = item.sku;
  const { dispatch } = useContext(store);
  return (
    <>
      <div>{item.product.name}
        {
          (item.product.availableDays ?? []).map((d) => <Pill key={d} background="blue800"
            color="grey200">{d}</Pill>)
        }</div>
      <div>{item.quantity}</div>
      <div style={{ textAlign: 'right' }}>{formatter.format(item.quantity * Number(price))}</div>
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
