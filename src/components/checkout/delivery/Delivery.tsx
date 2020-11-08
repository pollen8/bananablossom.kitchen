import React, { FC } from 'react';
import styled from 'styled-components';

import {
  ICheckoutConfig,
  IOrder,
} from '../../../pages/checkout';
import Col from '../../layout/Col';
import DeliveryMap from './DeliveryMap';
import PickupAddress from './PickupAddress';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface IProps {
  checkoutConfig: ICheckoutConfig;
  values: IOrder;
  handleInputChange: (key: string, value: any) => void;
}

const Delivery: FC<IProps> = ({
  checkoutConfig,
  values,
  handleInputChange,
}) => {
  const markers = values.delivery === 'pickup'
    ? checkoutConfig.pickupLocations.map((location) => ({
      showDeliveryArea: false,
      position: location.position,
      info: location.name,
    }))
    : [{
      position: { lat: 51.2550075, lng: -1.0959825 },
      showDeliveryArea: true,
    }]
  return (
    <Row>
      {
        values.delivery === 'pickup' &&
        <Col xs={12}>
          {
            checkoutConfig.pickupLocations.map((location, i) => <PickupAddress key={i}
              selected={values.pickupLocation.name === location.name}
              onClick={() => handleInputChange('pickupLocation', location)}
              location={location} />)
          }
        </Col>
      }
      <Col xs={12}>
        <DeliveryMap
          markers={markers}
        />
      </Col>
    </Row>
  )
}

export default Delivery;
