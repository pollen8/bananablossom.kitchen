import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import {
  Cell,
  Container,
  Grid,
} from './DatePciker';

interface ITime {
  hour: number;
  minute: number;
};

interface IProps {
  startTime?: ITime;
  endTime?: ITime;
  interval?: number;
  onChange?: (start: ITime, end: ITime) => void;
  width?: string | number;
}

const TimePicker: FC<IProps> = ({
  startTime,
  endTime,
  interval,
  onChange,
  width,
}) => {
  const hours = Array.from(Array(endTime.hour - startTime.hour).keys());
  const intervals = Array.from(Array((Math.floor(60 / interval)) + 1).keys()).map((v) => v * interval);
  const [start, setStart] = useState<ITime>({ hour: hours[0] + startTime.hour, minute: intervals[0] });
  console.log('hours', hours);
  return (
    <Container width={width}>
      <strong>From {start.hour}:{start.minute}</strong>
      <div>
        <strong>Hour</strong>
      </div>
      <Grid columns={hours.length}>
        {
          hours.map((h) => <Cell
            data-is-active={h + startTime.hour === start.hour ? 'yes' : 'no'}
            isActive={h + startTime.hour === start.hour}
            onClick={() => setStart({ hour: h + startTime.hour, minute: start.minute })}
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
            onClick={() => setStart({ hour: start.hour, minute: i })}
          >{i}</Cell>)
        }
      </Grid>
    </Container>
  )
}

TimePicker.defaultProps = {
  endTime: {
    hour: 23,
    minute: 59,
  },
  interval: 15,
  startTime: {
    hour: 0,
    minute: 0,
  },
};

export default TimePicker;