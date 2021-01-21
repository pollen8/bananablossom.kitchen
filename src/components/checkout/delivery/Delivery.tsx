import React, { FC } from 'react';
import styled from 'styled-components';

import {
  ICheckoutConfig,
  IOrder,
} from '../../../pages/checkout';
import Col from '../../layout/Col';
import { IPickupLocation } from '../pickupLocations';
import { dayToNumber } from '../possiblePickupDates';
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
  onClick: (location: IPickupLocation) => void;
  specialDate: Date | null;
  days: string[];
}

export const getAvailableLocation = (pickupLocations: IPickupLocation[], days: string[], specialDate: Date | null) => {

  const specialDateDayOfWeek = specialDate
    ? typeof specialDate === 'string' ? new Date(specialDate).getDay() : specialDate.getDay()
    : -1

  return pickupLocations
    .filter((location) => {
      // Filter those locations which are available for special days, if there is a special day.
      const found = location.daytimes.some((daytime) => dayToNumber(daytime.day) === specialDateDayOfWeek || specialDateDayOfWeek === -1);
      return found
    })
    .filter((location) => {
      if (specialDateDayOfWeek !== -1) {
        return true;
      }
      // not special - filter on days
      const found = location.specialDate === false && (location.daytimes.some((daytime) => days.length === 0 || days.includes(daytime.day)));
      return found
    })
}
const Delivery: FC<IProps> = ({
  checkoutConfig,
  days,
  values,
  onClick,
  specialDate,
}) => {
  const availableLocations = getAvailableLocation(checkoutConfig.pickupLocations, days, specialDate);
  const markers = values.delivery === 'pickup'
    ? availableLocations
      .map((location) => ({
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
            availableLocations.map((location, i) => <PickupAddress key={i}
              selected={values.pickupLocation.name === location.name}
              onClick={() => onClick(location)}
              specialDate={specialDate}
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
