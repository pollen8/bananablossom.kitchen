import React, {
  FC,
  useContext,
} from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import styled from 'styled-components';

import {
  ICartItem,
  store,
} from '../context/cartContext';
import { formatter } from '../lib/formatter';
import { ButtonIcon } from './Button';
import Pill from './ui/Pill';

export const CartPrice = styled.div`
  color: ${(props) => props.theme.colors.blue400};
`;

const Discounted = styled.div`
  text-decoration: line-through;
`;

interface IProps {
  item: ICartItem;
  readonly: boolean;
}

const CartItem: FC<IProps> = ({
  item,
  readonly,
}) => {
  const { name } = item.sku;
  const { dispatch } = useContext(store);
  const price = item.quantity * Number(item.sku.price);
  return (
    <tr>
      <td>{item.product.name}{' '}
        {
          (item.product.availableDays ?? []).map((d) => <Pill key={d} background="blue800"
            color="grey200">{d}</Pill>)
        }
        <div><small>
          {name}
        </small></div>
      </td>
      <td style={{ textAlign: 'right' }}>
        {item.quantity}
      </td>
      <td style={{ textAlign: 'right' }}>
        {
          item.discounted > 0 && <Discounted>{formatter.format(price)}</Discounted>
        }
        <CartPrice>{formatter.format(item.discounted === 0 ? price : item.discounted)}</CartPrice>
      </td>
      {
        !readonly &&
        <td style={{ textAlign: 'right' }}>
          <ButtonIcon
            onClick={() => dispatch({ type: 'CART_REMOVE', item })}>
            <AiOutlineMinusCircle />
          </ButtonIcon>
        </td>
      }
    </tr>
  )
}

export default CartItem;
