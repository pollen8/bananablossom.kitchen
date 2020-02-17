import React, { FC } from 'react';
import {
  Circle,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

const home = { lat: 51.2500035, lng: -1.0959825 };
const center = { lat: 51.2550075, lng: -1.0959825 };

interface IProps {
  showDeliveryArea?: boolean;
}
const DeliveryMap: FC<IProps> = ({
  showDeliveryArea = true,
}) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={home}
    >
      <Marker position={home} />
      {
        showDeliveryArea &&

        <Circle center={center}
          options={{
            fillColor: `rgb(239,120,144)`,
            fillOpacity: 0.2,
            strokeWeight: 2,
            clickable: false,
            editable: false,
            zIndex: 1,
          }}
          radius={3500} />
      }
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(DeliveryMap));
