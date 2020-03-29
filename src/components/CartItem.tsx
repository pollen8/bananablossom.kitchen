import React, {
  FC,
  useContext,
} from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import { ButtonIcon } from './Button';
import { TSkuProduct } from './MealList';

interface IProps {
  item: TSkuProduct;
  readonly: boolean;
}

const CartItem: FC<IProps> = ({
  item,
  readonly,
}) => {
  const { name, price, id } = item.skus[item.selectedSKUIndex];
  const { dispatch } = useContext(store);
  return (
    <>
      <div>{name}</div>
      <div>{item.quantity}</div>
      <div style={{ textAlign: 'right' }}>{formatter.format(item.quantity / 100 * price)}</div>
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
