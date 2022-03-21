import axios from 'axios';
import { format } from 'date-fns';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import Geocode from 'react-geocode';
import {
  AiOutlineCar,
  AiOutlineHome,
} from 'react-icons/ai';
import {
  queryCache,
  useMutation,
  useQuery,
} from 'react-query';
import styled, { useTheme } from 'styled-components';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import { IStoredOrder } from '../checkout/CheckoutForm';
import Stack from '../layout/Stack';
import Map from '../Map';
import { FlexRow } from '../MealListItemDetails';
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

Geocode.setApiKey('AIzaSyBiAFWUqxO84_q7OGyRerZfHks3CNBYK3A');

const fetchOrders = async () => {
  const res = await axios.post<any>("/.netlify/functions/order-list");
  return res.data.map(flatten);
}

const deleteOrders = async (selectedRows: string[]) => {
  await axios.post("/.netlify/functions/order-delete", { ids: selectedRows });
}

const Orders: FC = () => {

  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('orders')
    },
    onError: (e) => {
      console.log('errpr', e);
    }
  };
  const theme = useTheme();
  const [selectedOrder, setSelectedOrder] = useState<IStoredOrder | null>(null);
  const [deleteMutate] = useMutation(deleteOrders, mutationOptions)
  const [latlon, setLatLog] = useState<any>(null);

  const orders = useQuery<IStoredOrder[], 'orders', any>('orders', fetchOrders, {
    onSettled: (data) => {
      if (selectedOrder === null) {
        setSelectedOrder(data[0])
      }
    },
  });

  useEffect(() => {

    (async function () {
      if (!selectedOrder || !selectedOrder.customer.postcode) {
        return;
      }
      try {
        const address = `${selectedOrder.customer.street}
      ${selectedOrder.customer.postcode}
      ${selectedOrder.customer.city}`;
        const response = await Geocode.fromAddress(address);
        console.log('res', response);
        setLatLog(response.results[0].geometry.location);
      } catch (e) {
        console.log(e);
      }
    })()

  }, [selectedOrder]);

  if (orders.status === 'loading') {
    return <>loading....</>
  }

  if (orders.status === 'error') {
    return <span>Error: {orders.error}</span>
  }

  return (
    <>
      <h1>Orders</h1>
      <Stack reverse>
        <Card>
          <CardBody>
            <Button onClick={async () => {
              await axios.post("/.netlify/functions/testmail", {})
            }}>Test email</Button>
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
                  orders.data.map((data, i) => <tr key={data.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      document.body.scrollTop = document.documentElement.scrollTop = 0;
                      setSelectedOrder(data);
                    }}>
                    <td>
                      {format(data.ts / 1000, 'dd MMMM yyyy')}
                      <br />
                      <Status status={data.status}>{data.status}</Status>
                      <div><em>{data.error}</em></div>
                      <div className="mobile">
                        {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(data.amount)}
                        <hr />
                        <div>
                          {
                            data.customer.delivery === 'delivery'
                              ? <AiOutlineCar size="1rem" color={theme.colors.blue500} />
                              : <AiOutlineHome size="1rem" />
                          }{' '}{data.customer.order_date && format(new Date(data.customer.order_date), 'dd MMMM yy')} {data.customer.order_time.hour + ':' + data.customer.order_time.minute}</div>
                      </div>
                    </td>
                    <td>
                      <div>{data.customer.name}</div>
                      <div>{data.customer.email}</div>
                      <div>{data.customer.tel}</div>
                    </td>
                    <td>
                      <Pill>{data.order.length}</Pill>
                    </td>
                    <td className="desktop">
                      {
                        data.customer.delivery === 'delivery'
                          ? <AiOutlineCar size="1rem" color={theme.colors.blue500} />
                          : <AiOutlineHome size="1rem" />
                      }
                      {data.customer.delivery}
                      <div>{data.customer.order_date && format(new Date(data.customer.order_date), 'dd MMMM yy')}</div>
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
        {
          selectedOrder && <>
            <Card>
              <CardBody>
                <FlexRow justifyContent="space-between" style={{ alignItems: 'center' }}>
                  <h4 style={{ margin: 0, padding: 0 }}>Order details</h4>
                  <Button
                    onClick={() => {
                      deleteMutate([selectedOrder.id]);
                      setSelectedOrder(null);
                    }} color="danger">Delete</Button>
                </FlexRow>

                <div style={{ marginBottom: '0.5rem' }}>{
                  selectedOrder.order.map((o) => <div key={o.product}>{o.quantity} {o.product}</div>)
                }
                </div>
                <h4>Type: {selectedOrder.customer.delivery}</h4>

                <div>{selectedOrder.customer.order_date && format(new Date(selectedOrder.customer.order_date), 'dd MMMM yy')}</div>
                <div>{selectedOrder.customer.order_time.hour + ':' + selectedOrder.customer.order_time.minute}</div>
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(selectedOrder.amount)}

                {
                  selectedOrder.customer.postcode && latlon &&
                  <>
                    <h4>Address</h4>
                    <div>{selectedOrder.customer.street}</div>
                    <div>{selectedOrder.customer.postcode}</div>
                    <div>{selectedOrder.customer.city}</div>

                    <Map
                      center={latlon}
                      markers={[]}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjdFEZgu3s8slEPabzamBDEjIP6pU1OSU&libraries=places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `300px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    >
                    </Map>
                  </>
                }
              </CardBody>
            </Card>
          </>
        }
      </Stack>
    </>
  )
}

export default Orders;

