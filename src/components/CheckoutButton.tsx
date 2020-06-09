import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button from './Button';
import { getCartTotal } from './CartContent';

const LargeButton = styled(Button)`
background-color: ${(props) => props.theme.colors.pink500};
&:hover  {
  background-color: ${(props) => props.theme.colors.pink600} !important;
}
@media (min-width: 640px){ 
  width: 20rem;
  margin: auto;
}

@media (max-width: 640px){ 
 width: 100%;
}
`;

interface IProps {
  to?: string;
}
const CheckoutButton: FC<IProps> = ({
  to = '/cart'
}) => {
  const { state } = useContext(store);

  const availableDays = new Set<string>();
  state.items.forEach((item) => {
    (item.product.availableDays ?? []).forEach((d) => availableDays.add(d));
  })
  return (

    <Link to={to} style={{ textDecoration: 'none' }}>
      <LargeButton
        color="primary"
        size="lg"
        disabled={availableDays.size > 1}>
        <div style={{ marginRight: '0.3rem', display: 'inline-block' }}>
          {formatter.format(getCartTotal(state.items))}
        </div>{' '}Checkout
      </LargeButton>
    </Link>

  )
}

export default CheckoutButton;
