import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Cell,
  Container,
  Grid,
} from './DatePicker';

export interface ITime {
  hour: number;
  minute: number;
};

interface ITimeRange {
  start: ITime;
  end: ITime;
}

interface IProps {
  className?: string;
  startTime?: ITime, // Start time for the time range
  endTime?: ITime, // End time for the time range
  available?: ITimeRange[]; // Times ranges which can be selected
  interval?: number; // Minute interval
  onChange?: (time: ITime) => void;
  width?: string | number;
  useAmPm?: boolean;
  hideValue?: boolean;
  value?: ITime;
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
  if (!isHourDisabled(time.hour, available) && !isMinuteDisabled(time.hour, time.minute, available)) {
    return time;
  }

  const range = available.find((a) => a.end.hour === time.hour);
  if (!range) {
    // cant find anything - default to the start of the day
    return available[0].start;
  }
  return {
    ...time,
    minute: range.end.minute,
  }
}

const TimePicker: FC<IProps> = ({
  startTime,
  className,
  endTime,
  interval,
  onChange,
  width,
  available,
  useAmPm,
  hideValue,
  value,
}) => {
  const hours = Array.from(Array(endTime.hour + 1 - startTime.hour).keys());
  const intervals = Array.from(Array((Math.floor(60 / interval)) + 1).keys()).map((v) => v * interval)
    .filter((v) => v !== 60);
  const [start, setStart] = useState<ITime>(value ?? { hour: hours[0] + startTime.hour, minute: intervals[0] });
  const setTime = (time: ITime) => {
    const clamped = nearestAvailableTime(time, available);
    setStart(clamped);
    onChange(clamped);
  };
  useEffect(() => {
    const t = value ?? { hour: hours[0] + startTime.hour, minute: intervals[0] };
    const clamped = nearestAvailableTime(t, available);
    setStart(clamped);
  }, [value, available]);
  return (
    <Container width={width} className={className ?? 'time-picker'}>
      <div className="time-picker-header">
        {
          !hideValue && <strong>Selected {start.hour}:{start.minute === 0 ? '00' : start.minute}</strong>
        }
      </div>
      <h4 className="time-picker-interval-heading">hour</h4>
      <Grid columns={hours.length}>
        {
          hours.map((h) => {
            const isActive = h + startTime.hour === start.hour;
            const disabled = isHourDisabled(h + startTime.hour, available);
            const hour = h + startTime.hour;
            return <Cell
              key={`hour-${h}`}
              className={`time-picker-cell ${isActive && 'active'} ${disabled && 'disabled'}`}
              data-is-active={h + startTime.hour === start.hour ? 'yes' : 'no'}
              isActive={isActive}
              onClick={() => setTime({ hour: h + startTime.hour, minute: start.minute })}
              disabled={disabled}
            >
              {useAmPm ? formatAmPm(hour) : hour}
            </Cell>;
          })
        }
      </Grid>
      <h4 className="time-picker-interval-heading">
        Minute
      </h4>
      <Grid columns={intervals.length}>
        {
          intervals.map((i) => {
            const disabled = isMinuteDisabled(start.hour, i, available);
            const isActive = start.minute === i;
            return <Cell
              isActive={isActive}
              key={`time-${start.hour}-${i}`}
              className={`time-picker-cell ${isActive && 'active'} ${disabled && 'disabled'}`}
              disabled={disabled}
              onClick={() => setTime({ hour: start.hour, minute: i })}
            >
              {i}
            </Cell>
          })
        }
      </Grid>
    </Container>
  )
}

export const formatAmPm = (hour: number) => {
  if (hour <= 12) {
    return <>{hour}<small>am</small></>;
  }
  return <>{hour - 12}<small>pm</small></>;
}

TimePicker.defaultProps = {
  available: [],
  endTime: {
    hour: 24,
    minute: 0,
  },
  hideValue: false,
  interval: 15,
  startTime: {
    hour: 0,
    minute: 0,
  },
};

export default TimePicker;
