import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
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
}

const CartContent: FC<IProps> = ({
  id,
  readonly
}) => {
  const { state } = useContext(store);
  return (
    <Grid id={id}>
      {state.items.map((item) => <CartItem
        readonly={readonly}
        key={item.id} item={item} />)}
    </Grid>
  )
}

export default CartContent;
