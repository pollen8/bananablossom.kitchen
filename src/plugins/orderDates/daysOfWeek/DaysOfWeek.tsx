import React, { FC } from 'react';

import FormGroup from '../../../components/FormGroup';
import Label from '../../../components/Label';

interface OrderDatesPlugin<T> {
  handleUpdate: (data: T) => void;
  handleValidate?: () => void;
  data: T;
}

interface OrderDatesData {
  availableDays: string[];
  availableDate: Date | null;
}

export const DaysOfWeek: FC<OrderDatesPlugin<OrderDatesData>> = ({
  handleUpdate,
  handleValidate,
  data,
}) => {
  return (
    <FormGroup>
      <Label>Only available on</Label>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        .map((day) => <FormGroup key={day} check>
          <input
            type="checkbox"
            id={`menu-${day}`}
            checked={(data.availableDays).includes(day)}
            name={`sku-name[]`}
            onChange={(e) => {
              const availableDays = e.target.checked
                ? [...(data.availableDays), day]
                : (data.availableDays).filter((d) => d !== day);
              handleUpdate({ availableDays, availableDate: null })
            }} />
          <Label check htmlFor={`menu-${day}`}>
            {day}
          </Label>
        </FormGroup>)}
    </FormGroup>
  )
}
