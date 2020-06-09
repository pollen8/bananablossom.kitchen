import React, {
  FC,
  useContext,
} from 'react';

import {
  ICartItem,
  store,
} from '../context/cartContext';
import { formatter } from '../lib/formatter';
import CartItem, { CartPrice } from './CartItem';

interface IProps {
  id?: string;
  readonly?: boolean;
}

export const getCartTotal = (items: ICartItem[]) => {
  return items.reduce((p, n) => {
    if (n.discounted === 0) {
      return p + (Number(n.sku.price) * n.quantity);
    }
    return p + n.discounted;
  }, 0);
}
const CartContent: FC<IProps> = ({
  id,
  readonly
}) => {
  const { state } = useContext(store);
  return (
    <table id={id}>
      <thead>
        <tr>
          <th>Item</th>
          <th style={{ textAlign: 'right' }}>Quantity</th>
          <th style={{ textAlign: 'right', width: '5rem' }}>Price</th>
          {
            !readonly &&
            <th></th>
          }
        </tr>
      </thead>
      <tbody>
        {
          state.items.map((item) => <CartItem
            key={item.sku.id}
            readonly={readonly}
            item={item} />)
        }

      </tbody>
      <tfoot style={{ fontSize: '0.9rem' }}>
        <tr>
          <td></td>
          <td style={{ textAlign: 'right' }}>Total</td>
          <td style={{ textAlign: 'right', width: '5rem' }}>
            <CartPrice>{formatter.format(getCartTotal(state.items))}</CartPrice>
          </td>
          {!readonly && <td>{' '}</td>}
        </tr>
      </tfoot>
    </table>
  )
}

export default CartContent;
