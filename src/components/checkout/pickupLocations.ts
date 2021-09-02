import { MarkerProps } from 'react-google-maps';

import { ITime } from '../TimePicker';

export interface IPickupLocation {
  name: string;
  address: Record<string, string>;
  daytimes: {
    day: string, time: { start: ITime, end: ITime }
  }[];
  specialDate: boolean,
  position: MarkerProps['position'];
}

export const pickupLocations: IPickupLocation[] = [
  // {
  //   name: 'Basingstoke Market',
  //   address: {
  //     'p-street-address': 'Top of town',
  //     'p-locality': 'Basingstoke',
  //   },
  //   position: { lat: 51.2594192, lng: -1.0865909 },
  //   daytimes: [{
  //     day: 'Wednesday', time: { start: { hour: 11, minute: 0 }, end: { hour: 16, minute: 0 } },
  //   }]
  // },
  // {
  //   name: 'Portsmouth Arms: Christmas market',
  //   address: {
  //     'p-street-address': 'Hatch Warren Lane',
  //     'p-extended-address': 'Hatch Warren',
  //     'p-locality': 'Basingstoke',
  //     'p-postal-code': ' RG22 4RA',
  //   },
  //   position: { lat: 51.2339256, lng: -1.1178977 },
  //   daytimes: [{
  //     day: 'Thursday', time: { start: { hour: 18, minute: 0 }, end: { hour: 21, minute: 0 } },
  //   }],
  // },
  {
    name: 'Portsmouth Arms',
    address: {
      'p-street-address': 'Hatch Warren Lane',
      'p-extended-address': 'Hatch Warren',
      'p-locality': 'Basingstoke',
      'p-postal-code': ' RG22 4RA',
    },
    specialDate: false,
    position: { lat: 51.2339256, lng: -1.1178977 },
    daytimes: [{
      day: 'Saturday', time: { start: { hour: 10, minute: 0 }, end: { hour: 13, minute: 0 } },
    }],
  },
  {
    name: 'Banana Blossom',
    address: {
      'p-street-address': '35 Morley Road',
      'p-locality': 'Basingstoke',
      'p-postal-code': ' RG21 3LH',
    },
    position: { lat: 51.249996, lng: -1.0960011 },
    specialDate: false,
    daytimes: [
      {
        day: 'Thursday', time: { start: { hour: 17, minute: 0 }, end: { hour: 19, minute: 0 } },
      },
    ],
  },
  {
    name: 'Banana Blossom',
    address: {
      'p-street-address': '35 Morley Road',
      'p-locality': 'Basingstoke',
      'p-postal-code': ' RG21 3LH',
    },
    specialDate: true,
    position: { lat: 51.249996, lng: -1.0960011 },
    daytimes: [
      {
        day: 'Sunday', time: { start: { hour: 17, minute: 30 }, end: { hour: 20, minute: 0 } },
      },
    ],
  },
]
