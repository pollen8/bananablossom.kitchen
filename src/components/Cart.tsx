import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CartContent from './CartContent';
import PromotionCode from './checkout/PromotionCode';
import OrderHelp from './OrderHelp';
import Price from './Price';
import Facebook from './social/Facebook';
import TripAdvisor from './TripAdvisor';
import Badge from './ui/Badge';

interface IProps {
  readonly?: boolean;
  hideInfo?: boolean;
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

export const getCartTotal = () => {
  const { state } = useContext(store);
  const total = state.items.reduce((total, item) => {
    const sku = item.skus[item.selectedSKUIndex];
    return total + (item.quantity * sku.price / 100);
  }, 0);
  return total;
}

const Cart: FC<IProps> = ({
  readonly,
  hideInfo = false,
}) => {
  const { state } = useContext(store);
  const [discount, setDiscount] = useState(0);
  const total = getCartTotal()

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
        <Icons>

          <div>
            <Facebook />
            <TripAdvisor />
          </div>
        </Icons>
      </CardBody>
    </Card>
  )
}

Cart.defaultProps = {
  readonly: false,
};


export default Cart;
