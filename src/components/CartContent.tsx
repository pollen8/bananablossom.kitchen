import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import CartItem from './CartItem';

const Grid = styled.div`
margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: 45% 15% 25% 15%;
  grid-template-rows: auto;
  grid-row-gap: 0.5rem;
  align-items: center;
`;

interface IProps {
  id?: string;
  readonly?: boolean;
  discount: number;
  total: number;
  discountedTotal: number;
}

const CartContent: FC<IProps> = ({
  id,
  discount,
  total,
  discountedTotal,
  readonly
}) => {
  const { state } = useContext(store);
  return (
    <Grid id={id}>
      {state.items.map((item) => <CartItem
        readonly={readonly}
        key={item.id} item={item} />)}
      {
        discount > 0 &&
        <>
          <div>{discount}% discount</div>
          <div></div>
          <div style={{ textAlign: 'right' }}>- {formatter.format(total - discountedTotal)}</div>
          <div></div>
        </>
      }
      <div></div>
      <div />
      <div style={{ textAlign: 'right' }}>
        <h4>
          {formatter.format(discountedTotal)}
        </h4>
      </div>
    </Grid>
  )
}

export default CartContent;
