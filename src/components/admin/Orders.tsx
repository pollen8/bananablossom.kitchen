import axios from 'axios';
import { format } from 'date-fns';
import React, {
  FC,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import Pill from '../ui/Pill';
import { flatten } from './Products';

const Status = styled.strong<{ status: string }>`
  color: ${(props) => props.status === 'pending payment'
    ? 'orange'
    : props.status === 'payment failed' ? 'red' : 'green'};
`;

const Table = styled.table`
tr:nth-child(even) {
  background-color: ${(props) => props.theme.colors.grey800};
}

@media (min-width: 640px){ 
  .mobile {
    display: none;
  }
}

@media (max-width: 640px){ 

 .desktop {
   display: none;
 }
}
`;

const fetchOrders = async () => {
  const res = await axios.post<any>("/.netlify/functions/order-list");
  return res.data.map(flatten);
}


const Orders: FC = () => {
  const [toggle, setToggle] = useState<boolean[]>([false]);

  const orders = useQuery('orders', fetchOrders);

  if (orders.status === 'loading') {
    return <>loading....</>
  }

  if (orders.status === 'error') {
    return <span>Error: {orders.error.message}</span>
  }

  return (
    <>
      <h1>orders</h1>
      <Card>
        <CardBody>
          <Table style={{ backgroundColor: '#fff' }}>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Customer</th>
                <th className="desktop">Items</th>
                <th className="desktop">Delivery</th>
                <th className="desktop">Value</th>
              </tr>
            </thead>
            <tbody>

              {
                orders.data.map((data, i) => <tr key={data.id}>
                  <td>
                    {format(data.ts / 1000, 'dd MMMM yyyy')}
                    <br />
                    <Status status={data.status}>{data.status}</Status>
                    <div><em>{data.error}</em></div>
                    <div className="mobile">
                      {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(data.amount)}
                      <hr />
                      {data.customer.delivery}
                      <div>{format(new Date(data.customer.order_date), 'dd MMMM yy')}</div>
                      <div>{data.customer.order_time.hour + ':' + data.customer.order_time.minute}</div>
                    </div>
                  </td>
                  <td>
                    <div>{data.customer.name}</div>
                    <div>{data.customer.email}</div>
                    <div>{data.customer.tel}</div>
                    <div className="mobile">
                      <Button
                        size="sm"
                        onClick={() => {
                          const t = [...toggle];
                          t[i] = t[i] ? !t[i] : true;
                          console.log('clikc', t);
                          setToggle(t);
                        }}>{data.order.length} items</Button>
                      <div style={{ display: toggle[i] ? 'block' : 'none' }}>
                        {
                          data.order.map((o) => <div key={o.product}><small>{o.quantity} {o.product}</small></div>)
                        }
                      </div>
                    </div>
                  </td>
                  <td
                    className="desktop">
                    {
                      data.order.map((o) => <div key={o.product}>{o.quantity} {o.product}</div>)
                    }
                  </td>
                  <td className="desktop">
                    {data.customer.delivery}
                    <div>{format(new Date(data.customer.order_date), 'dd MMMM yy')}</div>
                    <div>{data.customer.order_time.hour + ':' + data.customer.order_time.minute}</div>
                  </td>
                  <td className="desktop">
                    {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(data.amount)}
                  </td>
                </tr>
                )
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}

export default Orders;

