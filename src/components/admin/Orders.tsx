import axios from 'axios';
import { format } from 'date-fns';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import Card from '../Card';
import CardBody from '../CardBody';

const Orders: FC = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/order-list");
      setOrders(res.data);
    };
    fetch();
  }, []);
  return (
    <>
      <h1>orders</h1>
      <Card>
        <CardBody>
          <table style={{ backgroundColor: '#fff' }}>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Custonmer</th>
                <th>Items</th>
                <th>Delivery</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map(({ data, ts }) => <tr>
                  <td>
                    {format(ts / 1000, 'dd MMMM yyyy')}
                  </td>
                  <td>
                    <div>{data.customer.name}</div>
                    <div>{data.customer.email}</div>
                    <div>{data.customer.tel}</div>
                  </td>
                  <td key={ts}>
                    {
                      data.order.map((o) => <div key={o.product}>{o.quantity} {o.product}</div>)
                    }
                  </td>
                  <td>
                    <div>{format(new Date(data.customer.order_date), 'dd MMMM yy')}</div>
                    <div>{data.customer.order_time.hour + ':' + data.customer.order_time.minute}</div>
                  </td>
                  <td>{data.amount}</td>
                </tr>
                )
              }

            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default Orders;

