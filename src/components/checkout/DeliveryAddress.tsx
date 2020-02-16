import React, { useState } from 'react';
import {
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

import useAddressPredictions from '../../lib/addressLookup';
import Label from '../Label';

const DeliveryAddress = () => {
  const [input, setInput] = useState('');
  const predictions = useAddressPredictions(input);

  return (
    <>
      <Label>Deliver to</Label>
      <input
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>{prediction}</li>
        ))}
      </ul>
    </>
  )
};

export default withScriptjs(withGoogleMap(DeliveryAddress));
