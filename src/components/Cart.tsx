import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
} from 'react';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CartContent from './CartContent';
import OrderHelp from './OrderHelp';
import Price from './Price';
import Badge from './ui/Badge';

interface IProps {
  readonly?: boolean;
  hideInfo?: boolean;
}

const Cart: FC<IProps> = ({
  readonly,
  hideInfo = false,
}) => {
  const { state } = useContext(store);
  const total = state.items.reduce((total, item) => total + (item.quantity * item.price / 100), 0);
  return (
    <Card>
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
          <div id="controls">
            <Price id="price">
              {formatter.format(total)}
            </Price>
            <CartContent
              id="cart-content"
              readonly={readonly} />
            {
              !readonly &&

              <Link to="/checkout">
                <Button color="primary">
                  <Badge id="order-total-badge"
                    background="white100" color="blue100">
                    {state.items.length}
                  </Badge>
                  Checkout
                </Button>
              </Link>
            }
          </div>
        }
        {
          !hideInfo && <OrderHelp />
        }

      </CardBody>
    </Card>
  )
}

Cart.defaultProps = {
  readonly: false,
};


export default Cart;
