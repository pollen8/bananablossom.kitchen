import { gql } from 'apollo-boost';
import { addDays } from 'date-fns';
import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import {
  Control,
  Controller,
} from 'react-hook-form';

import Alert from '../Alert';
import DatePicker from '../DatePciker';
import TimePicker from '../TimePicker';

interface IDay {
  id: string;
  start: string;
  end: string;
}

const GET_DAYS = gql`{
  workingDays {
    id
    start
    end
  }
}`;

interface IProps {
  control: Control;
}
const Calendar: FC<IProps> = ({
  control
}) => {
  const { loading, error, data } = useQuery<{ workingDays: IDay[] }>(GET_DAYS, {
    notifyOnNetworkStatusChange: true
  });
  if (loading) {
    return <p>...loading</p>;
  }
  if (error) {
    return <Alert color="danger">{error}</Alert>
  }

  const ranges: any[] = data.workingDays.map((day) => ({
    from: new Date(day.start),
    to: new Date(day.end),
  }));

  const disabledDays: any[] = [
    { daysOfWeek: [0, 6] },
    { before: new Date() },
  ].concat(ranges);

  return (
    <>
      K
      <Controller as={DatePicker}
        name="order_date"
        control={control}
        width="300px"
        disabledRanges={[
          { start: new Date(), end: addDays(new Date(), 1) }
        ]} />
      <Controller as={TimePicker}
        name="order_time"
        control={control}
        width="300px"
        startTime={{ hour: 9, minute: 0 }} />
    </>
  )
}

export default Calendar;
