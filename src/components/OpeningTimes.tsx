import React from 'react';

import { times } from './checkout/Calendar';

const days = ['Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday']
export const OpeningTimes = () => <>
  <h1>Opening Times</h1>
  <table style={{ width: '100%' }}>
    {
      times.map((t, i) => <tr key={i}>
        <th>{days[i]}</th>
        {t.deliveryAvailability.map((d, x) =>
          <td
            key={x}
            colSpan={t.deliveryAvailability.length === 2 ? 1 : 2}>
            {d.start.hour}:{d.start.minute === 0 ? '00' : d.start.minute} -
           {d.end.hour}:{d.end.minute === 0 ? '00' : d.end.minute}</td>)
        }

      </tr>)
    }
    <tr>
      <th>Sunday</th>
      <td colSpan={2}>Closed</td>
    </tr>
  </table>
</>
