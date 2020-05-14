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
import Facebook from './social/Facebook';
import TripAdvisor from './TripAdvisor';

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
  console.log('state', state);
  const total = state.items.reduce((total, item) => {
    console.log('item', item);
    return total + (item.quantity * item.sku.price);
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
            <CartContent
              id="cart-content"
              discount={discount}
              total={total}
              discountedTotal={discountedTotal}
              showTotal={false}
              readonly={readonly} />
            {
              !readonly &&
              <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <Button color="primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <div style={{ marginRight: '0.3rem' }}>{formatter.format(discountedTotal)}</div>{' '}
                  <div>Checkout</div>
                </Button>
              </Link>
            }
            <PromotionCode
              setDiscount={setDiscount}
            />
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
