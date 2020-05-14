import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import CartItem from './CartItem';

const Grid = styled.div<{ readonly: boolean }>`
margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: ${(props) => props.readonly ? '55% 15% 25%' : '45% 15% 25% 15%'};
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
  showTotal?: boolean;
}

const CartContent: FC<IProps> = ({
  id,
  discount,
  total,
  discountedTotal,
  readonly,
  showTotal = true,
}) => {
  const { state } = useContext(store);
  return (
    <div id={id}>
      <Grid readonly={readonly}>
        {state.items.map((item) => <CartItem
          key={item.id}
          readonly={readonly}
          item={item} />)}
        {
          discount > 0 &&
          <>
            <div>{discount}% discount</div>
            <div />
            <div style={{ textAlign: 'right' }}>- {formatter.format(total - discountedTotal)}</div>
            {
              !readonly && <div />
            }
          </>
        }
        <div />
        <div />

      </Grid>
      {showTotal &&
        <div style={{ textAlign: 'right' }}>
          <h4>
            {formatter.format(discountedTotal)}
          </h4>
        </div>
      }
    </div>
  )
}

export default CartContent;
