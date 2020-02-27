import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button from './Button';
import Price from './Price';
import Badge from './ui/Badge';

const Footer = styled.div`
  position: sticky;
  padding: 0.25rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 5px 7px 14px 10px rgba(60,66,87,0.12),0 3px 6px 0 rgba(0,0,0,0.12)
`;

const MobileCart: FC = () => {
  const { state } = useContext(store);
  if (state.items.length == 0) {
    return null;
  }
  const total = state.items.reduce((total, item) => total + (item.quantity * item.price / 100), 0);
  return (
    <Footer>
      <Price>
        {formatter.format(total)}
      </Price>
      <Link to="/checkout">
        <Button color="primary">
          <Badge background="white100" color="blue100">
            {state.items.length}
          </Badge>
          Checkout
        </Button>
      </Link>
    </Footer>
  );
}

export default MobileCart;
