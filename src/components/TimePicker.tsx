import React, {
  FC,
  useState,
} from 'react';

import {
  Cell,
  Container,
  Grid,
} from './DatePicker';

interface ITime {
  hour: number;
  minute: number;
};

interface ITimeRange {
  start: ITime;
  end: ITime;
}

interface IProps {
  startTime?: ITime, // Start time for the time range
  endTime?: ITime, // End time for the time range
  available?: ITimeRange[]; // Times ranges which can be selected
  interval?: number; // Minute interval
  onChange?: (start: ITime, end: ITime) => void;
  width?: string | number;
}

const isHourDisabled = (hour: number, available: ITimeRange[]) => {
  if (available.length === 0) {
    return false;
  }
  return available.reduce((prev, next) => next.start.hour <= hour && hour <= next.end.hour
    ? false : prev
    , true);
}

const isMinuteDisabled = (hour: number, minute: number, available: ITimeRange[]) => {
  if (available.length === 0) {
    return false;
  }
  return available.reduce((prev, next) => next.start.hour <= hour && hour <= next.end.hour
    ? next.end.hour === hour && minute > next.end.minute
    : prev
    , true);
}

const nearestAvailableTime = (time: ITime, available: ITimeRange[]) => {
  console.log('nearest start');
  if (!isHourDisabled(time.hour, available) && !isMinuteDisabled(time.hour, time.minute, available)) {
    return time;
  }

  console.log(available, time.hour);
  const range = available.find((a) => a.end.hour == time.hour);
  console.log('range', range);
  if (!range) {
    throw new Error('this shouldnt happen');
  }
  return {
    ...time,
    minute: range.end.minute,
  }
}

const TimePicker: FC<IProps> = ({
  startTime,
  endTime,
  interval,
  onChange,
  width,
  available,
}) => {
  const hours = Array.from(Array(endTime.hour - startTime.hour).keys());
  const intervals = Array.from(Array((Math.floor(60 / interval)) + 1).keys()).map((v) => v * interval)
    .filter((v) => v !== 60);
  const [start, setStart] = useState<ITime>({ hour: hours[0] + startTime.hour, minute: intervals[0] });
  const setTime = (time: ITime) => setStart(nearestAvailableTime(time, available));

  return (
    <Container width={width}>
      <strong>Selected {start.hour}:{start.minute === 0 ? '00' : start.minute}</strong>
      <div>
        <strong>Hour</strong>
      </div>
      <Grid columns={hours.length}>
        {
          hours.map((h) => <Cell
            data-is-active={h + startTime.hour === start.hour ? 'yes' : 'no'}
            isActive={h + startTime.hour === start.hour}
            onClick={() => setTime({ hour: h + startTime.hour, minute: start.minute })}
            disabled={isHourDisabled(h + startTime.hour, available)}
          >
            {h + startTime.hour}
          </Cell>)
        }
      </Grid>
      <div>
        <strong>Minute</strong>
      </div>
      <Grid columns={intervals.length}>
        {
          intervals.map((i) => <Cell
            isActive={start.minute === i}
            disabled={isMinuteDisabled(start.hour, i, available)}
            onClick={() => setTime({ hour: start.hour, minute: i })}
          >{i}</Cell>)
        }
      </Grid>
    </Container>
  )
}

TimePicker.defaultProps = {
  available: [],
  endTime: {
    hour: 24,
    minute: 0,
  },
  interval: 15,
  startTime: {
    hour: 0,
    minute: 0,
  },
};

export default TimePicker;