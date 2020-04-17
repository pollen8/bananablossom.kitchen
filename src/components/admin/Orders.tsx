import axios from 'axios';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';

const Orders: FC = () => {
  const [orders, setOrders] = useState();
  console.log('orders', orders);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/order-list");
      console.log('res data', res.data);
      setOrders(res.data);
    };
    fetch();
  }, []);
  return (
    <>
      <h1>orders</h1>
    </>
  )
}

export default Orders;
