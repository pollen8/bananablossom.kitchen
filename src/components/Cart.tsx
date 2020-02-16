import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CartItem from './CartItem';
import OrderHelp from './OrderHelp';

const StickyCard = styled(Card)`
  position: sticky;
  top: 11rem;
`;

const Grid = styled.div`
margin: 0 0 1rem 0;
  display: grid;
  grid-template-columns: 45% 15% 25% 15%;
  grid-template-rows: auto;
  // grid-column-gap: 4rem;
  grid-row-gap: 0.5rem;
  align-items: center;
`;

interface IProps {
  readonly?: boolean;
}

const Cart: FC<IProps> = ({ readonly }) => {
  const { state } = useContext(store);
  return (
    <StickyCard>
      <CardBody>
        <h3>
          {
            readonly ? 'Your order' : 'Cart'
          }
        </h3>
        {
          state.items.length === 0 && <p>Your basket is empty</p>
        }
        {
          state.items.length > 0 &&
          <>
            <Grid>
              {state.items.map((item) => <CartItem
                readonly={readonly}
                key={item.id} item={item} />)}
            </Grid>
            {
              !readonly &&

              <Link to="/checkout">
                <Button color="primary">
                  Checkout
          </Button>
              </Link>
            }
          </>
        }
        <OrderHelp />
      </CardBody>
    </StickyCard>
  )
}

Cart.defaultProps = {
  readonly: false,
};

export default Cart;