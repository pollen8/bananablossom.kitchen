import axios from 'axios';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import Alert from './Alert';
import { deliveryFreeFrom } from './checkout/DeliveryOption';

const OrderHelp: FC = () => {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/promotion-list");
      console.log('res data', res.data);
      setPromotions(res.data);
    };
    fetch();
  }, []);
  console.log('promotions', promotions);
  return (
    <>
      {
        promotions.length > 0 &&
        <Alert color="info" style={{ marginTop: '0.5rem' }}>
          Use the promotion code <code style={{ backgroundColor: '#fff' }}>
            {promotions[0].data.code}
          </code>{' '}to get {promotions[0].data.percentage}% off
        </Alert>
      }
      <div id="order-help" style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
        <p>Delivery around Basingstoke for orders over £{deliveryFreeFrom}.00</p>
        <p>
          Dishes may contain allergens. If you have any dietary requirements, please let us know when you place your order.
        </p>
        <p>
          All our dishes are freshly made to order, please orders by 17h30 for next day collection. </p>
        <p>
          The “Pho bo” beef broth is only available on Thursdays by order the previous day.
        </p>
      </div>
    </>
  )
};

export default OrderHelp;
