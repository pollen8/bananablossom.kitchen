import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import {
  isProduct,
  store,
} from '../context/cartContext';
import Alert from './Alert';
import CartContent from './CartContent';
import PromotionCode from './checkout/PromotionCode';
import CheckoutButton from './CheckoutButton';
import Stack from './layout/Stack';
import OrderHelp from './OrderHelp';
import Facebook from './social/Facebook';
import TripAdvisor from './TripAdvisor';

interface IProps {
  readonly?: boolean;
}

const Icons = styled.div`
  display: none;
  > div {
    display: flex;
    align-items: center;
  }
  @media (min-width: 640px){ 
    display: block;
  }
`;

const Cart: FC<IProps> = ({
  readonly,
}) => {
  const { state } = useContext(store);

  const availableDays = new Set<string>();
  state.items.forEach((item) => {
    if (isProduct(item.product)) {
      (item.product.availableDays ?? []).forEach((d) => availableDays.add(d));
    }
  })
  return (
    <>
      <h1>
        {
          readonly ? 'Your order' : 'Cart'
        }
      </h1>
      {
        state.items.length === 0 && <p>Your basket is empty</p>
      }
      {
        availableDays.size > 1 &&
        <Alert color="danger">You're cart contains items which can not be provided for on the same day</Alert>
      }
      {
        state.items.length > 0 &&
        <div id="controls">
          <CartContent
            id="cart-content"
            readonly={readonly} />
          {
            !readonly &&
            <Stack>
              <PromotionCode />
              <div style={{ textAlign: 'right' }}>
                <CheckoutButton to="/checkout" />
              </div>
            </Stack>
          }

        </div>
      }
      <OrderHelp />
      <Icons>
        <div>
          <Facebook />
          <TripAdvisor />
        </div>
      </Icons>
    </>
  )
}

Cart.defaultProps = {
  readonly: false,
};


export default Cart;
