import React, {
  FC,
  useContext,
} from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import { ButtonIcon } from './Button';
import { IMeal } from './MealList';

interface IProps {
  item: IMeal;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const CartItem: FC<IProps> = ({ item }) => {
  const { dispatch } = useContext(store);
  return (
    <>
      <div>{item.title}</div>
      <div>{item.quantity}</div>
      <div>{formatter.format(item.quantity * item.price)}</div>
      <ButtonIcon
        onClick={() => dispatch({ type: 'CART_REMOVE', item })}>
        <AiOutlineMinusCircle />
      </ButtonIcon>
    </>
  )
}

export default CartItem;
