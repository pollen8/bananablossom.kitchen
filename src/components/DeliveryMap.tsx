import React, { FC } from 'react';

import Map from './Map';

// const home = { lat: 51.2500035, lng: -1.0959825 };
const center = { lat: 51.2550075, lng: -1.0959825 };

interface IProps {
  showDeliveryArea?: boolean;
}
const DeliveryMap: FC<IProps> = ({
  showDeliveryArea = true,
}) => {
  return (
    <Map
      showDeliveryArea={showDeliveryArea}
      center={center}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjdFEZgu3s8slEPabzamBDEjIP6pU1OSU&libraries=places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default DeliveryMap;
