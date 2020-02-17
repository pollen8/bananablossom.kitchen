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
import CartContent from './CartContent';
import CartItem from './CartItem';
import OrderHelp from './OrderHelp';

const StickyCard = styled(Card)`
  position: sticky;
  top: 11rem;
`;



interface IProps {
  readonly?: boolean;
  hideInfo?: boolean;
}

const Cart: FC<IProps> = ({ readonly,
  hideInfo = false,
}) => {
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
            <CartContent
              readonly={readonly} />
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
        {
          !hideInfo && <OrderHelp />
        }

      </CardBody>
    </StickyCard>
  )
}

Cart.defaultProps = {
  readonly: false,
};

export default Cart;