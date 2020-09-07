import React, { FC } from 'react';
import {
  Circle,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

interface IProps {
  showDeliveryArea?: boolean;
  center: { lat: number, lng: number };
}

const Map: FC<IProps> = ({
  showDeliveryArea = false,
  center,
}) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={center}
    >
      <Marker position={center} />
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
          radius={4700} />
      }
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(Map));
