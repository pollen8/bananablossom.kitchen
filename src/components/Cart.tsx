import axios from 'axios';
import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
  useState,
} from 'react';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CartContent from './CartContent';
import PromotionCode from './checkout/PromotionCode';
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
  const [discount, setDiscount] = useState(0);
  const total = state.items.reduce((total, item) => total + (item.quantity * item.price / 100), 0);

  const discountedTotal = discount === 0
    ? total
    : total - (total * (discount / 100));


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
            {
              discount === 0 &&
              <Price id="price">
                {formatter.format(total)}
              </Price>
            }
            {
              discount > 0 &&
              <Price id="price">
                <s>{formatter.format(total)}</s>{' '}
                {formatter.format(discountedTotal)}
              </Price>
            }
            <CartContent
              id="cart-content"
              discount={discount}
              total={total}
              discountedTotal={discountedTotal}
              readonly={readonly} />

            <PromotionCode
              setDiscount={setDiscount}
            />
            {
              !readonly &&
              <Link to="/checkout">
                <Button color="primary" style={{ marginTop: '0.5rem' }}>
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
