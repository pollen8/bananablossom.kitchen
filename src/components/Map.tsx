import React, {
  FC,
  useState,
} from 'react';
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerProps,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

export type IMarker = MarkerProps & {
  showDeliveryArea?: boolean;
  info?: string;
}
interface IProps {
  center: { lat: number, lng: number };
  markers: IMarker[];
}

const Map: FC<IProps> = ({
  markers,
  center,
}) => {
  const [info, setInfo] = useState<Record<string, boolean>>({});
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={center}
    >
      {
        markers.map((marker, i) => {
          const k = typeof marker.position === 'object' ? JSON.stringify(marker.position) : marker.position;
          return <Marker
            onClick={() => setInfo({ ...info, [k]: true })}
            key={k}
            position={marker.position}>
            {
              marker.info && info[k] && <InfoWindow
                onCloseClick={() => setInfo({ ...info, [k]: false })}>
                <div>{marker.info}</div>
              </InfoWindow>
            }

          </Marker>
        })
      }
      {
        markers.filter((marker) => marker.showDeliveryArea).map((marker, i) => {
          const k = typeof marker.position === 'object' ? JSON.stringify(marker.position) : marker.position;
          return <Circle center={marker.position}
            key={String(marker.position)}
            options={{
              fillColor: `rgb(239,120,144)`,
              fillOpacity: 0.2,
              strokeWeight: 2,
              clickable: false,
              editable: false,
              zIndex: 1,
            }}
            radius={4700} />
        })
      }
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(Map));
