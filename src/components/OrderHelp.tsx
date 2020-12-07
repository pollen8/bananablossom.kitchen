import React, { FC } from 'react';

import { checkoutConfig } from '../pages/checkout';

const OrderHelp: FC = () => {
  return (
    <>
      <div id="order-help" style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
        {/* <p>Delivery around Basingstoke for orders over £{checkoutConfig.deliveryFreeFrom}.00</p> */}
        <p>
          Dishes may contain allergens. If you have any dietary requirements, please let us know when you place your order.
        </p>
        {/* <p>
          All our dishes are freshly made to order, please orders by 10:00am for next day collection. </p> */}
        {/* <p>
          The “Pho bo” beef broth is only available on Thursdays by order the previous day.
        </p> */}
      </div>
    </>
  )
};

export default OrderHelp;
