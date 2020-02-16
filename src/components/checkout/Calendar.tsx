import { addDays } from 'date-fns';
import React, { FC } from 'react';
import {
  Control,
  Controller,
} from 'react-hook-form';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

interface IDay {
  id: string;
  start: string;
  end: string;
}


interface IProps {
  control: Control;
}
const Calendar: FC<IProps> = ({
  control
}) => {


  // const ranges: any[] = data.workingDays.map((day) => ({
  //   from: new Date(day.start),
  //   to: new Date(day.end),
  // }));

  // const disabledDays: any[] = [
  //   { daysOfWeek: [0, 6] },
  //   { before: new Date() },
  // ].concat(ranges);

  return (
    <>
      <Controller as={DatePicker}
        name="order_date"
        control={control}
        width="300px"
        disabledRanges={[
          { start: new Date(), end: addDays(new Date(), 1) }
        ]} />
      {/* <Controller as={TimePicker}
        name="order_time"
        control={control}
        width="300px"
        startTime={{ hour: 9, minute: 0 }} /> */}
    </>
  )
}

export default Calendar;
