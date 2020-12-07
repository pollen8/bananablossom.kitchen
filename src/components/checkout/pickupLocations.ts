import { MarkerProps } from 'react-google-maps';

import { ITime } from '../TimePicker';

export interface IPickupLocation {
  name: string;
  address: Record<string, string>;
  daytimes: {
    day: string, time: { start: ITime, end: ITime }
  }[];

  position: MarkerProps['position'];
}

export const pickupLocations: IPickupLocation[] = [
  {
    name: 'Basingstoke Market',
    address: {
      'p-street-address': 'Top of town',
      'p-locality': 'Basingstoke',
    },
    position: { lat: 51.2594192, lng: -1.0865909 },
    daytimes: [{
      day: 'Wednesday', time: { start: { hour: 11, minute: 0 }, end: { hour: 16, minute: 0 } },
    }]
  },
  {
    name: 'Portsmouth Arms: Christmas market',
    address: {
      'p-street-address': 'Hatch Warren Lane',
      'p-extended-address': 'Hatch Warren',
      'p-locality': 'Basingstoke',
      'p-postal-code': ' RG22 4RA',
    },
    position: { lat: 51.2339256, lng: -1.1178977 },
    daytimes: [{
      day: 'Thursday', time: { start: { hour: 18, minute: 0 }, end: { hour: 21, minute: 0 } },
    }],
  },
  {
    name: 'Portsmouth Arms',
    address: {
      'p-street-address': 'Hatch Warren Lane',
      'p-extended-address': 'Hatch Warren',
      'p-locality': 'Basingstoke',
      'p-postal-code': ' RG22 4RA',
    },
    position: { lat: 51.2339256, lng: -1.1178977 },
    daytimes: [{
      day: 'Saturday', time: { start: { hour: 10, minute: 0 }, end: { hour: 15, minute: 0 } },
    }],
  },
]
