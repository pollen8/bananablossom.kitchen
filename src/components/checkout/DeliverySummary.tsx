import React, { FC } from 'react';

import { IOrder } from '../../pages/checkout';
import Label from '../Label';
import { formatTime } from './Calendar';

interface IProps {
  order: IOrder;
}
const DeliverySummary: FC<IProps> = ({
  order,
}) => {
  return (
    <>
      <div>
        <Label text>For</Label>
        <div>{order.name} ({order.email})</div>
      </div>
      <div>
        {
          order.delivery === 'pickup' && <>
            <Label text>Pickup</Label>
            <div>On {new Date(order.order_date).toLocaleDateString('en-GB')}{' '}
              {formatTime(order.order_time)}</div>
          </>
        }
        {
          order.delivery === 'delivery' && <>
            <Label text>Delivery</Label>
            <p>On {new Date(order.order_date).toLocaleDateString('en-GB')}{' '}
              {formatTime(order.order_time)}</p>
            <p>To: {order.street}<br />
              {order.city}<br />
              {order.postcode}<br />
            </p>
          </>
        }

      </div>
    </>
  )
}

export default DeliverySummary;
