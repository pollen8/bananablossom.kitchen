import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

interface IDayProps {
  disabled?: boolean;
  isToday?: boolean;
  isActive?: boolean;
}

interface IContainer {
  width?: string | number;
}

interface IGrid {
  columns: number;
}

export const Grid = styled.div<IGrid>`
  display: grid;
  grid-template-columns: ${(props) => '1fr '.repeat(props.columns)};
  grid-row-gap: 0.5rem;
`;

const DayHeading = styled.div`
  font-weight: bold;
  text-align: center;
`;

export const Container = styled.div<IContainer>`
  background-color: #fff;
  width: ${(props) => props.width || '100%'};
  padding: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Controls = styled.div`

`;

const color = (props: IDayProps) => {
  if (props.isActive) {
    return '#fff';
  }
  if (props.disabled) {
    return props.isToday ? 'hsl(100, 50%, 60%)' : '#ccc';
  }
  return props.isToday ? 'hsl(100, 50%, 60%)' : '#000';
}

export const Cell = styled.div<IDayProps>`
  text-align: center;
  color: ${(props) => color(props)};
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${(props) => props.isActive ? 'hsl(200,50%, 60%);' : 'none'};
  &:hover {
    box-shadow: ${(props) => props.disabled ? 'none' : '0 2px 7px 0 rgba(60,66,87, 0.12), 0 1px 2px 0 rgba(0,0,0, 0.12)'};
  }
`;

interface IProps {
  name?: string;
  id?: string;
  className?: string;
  disabledRanges?: Interval[];
  disabledDaysOfWeek?: number[]
  value?: Date;
  width?: string | number;
  onChange?: (value: Date) => void;
}

const isDisabled = (date: Date, disabled: Interval[]) => {
  return disabled.some((d) => isWithinInterval(date, d));
};

const isDisabledDayOfWeek = (date: Date, daysOfWeek: number[]) => {
  if (!daysOfWeek || daysOfWeek.length === 0) {
    return false;
  }
  const dayOfWeek = date.getDay();
  return daysOfWeek.includes(dayOfWeek);
};

const isPast = (date: Date) => {
  return isAfter(new Date(), date);
}

const DatePicker: FC<IProps> = ({
  disabledRanges,
  id,
  name,
  onChange,
  value,
  width,
  className,
  disabledDaysOfWeek,
}) => {
  const [now, setNow] = useState(value || new Date());
  const daysInMonth = getDaysInMonth(now);
  const days = Array.from(Array(daysInMonth).keys());
  const firstDateOfMonth = startOfMonth(now);
  const firstDays = Array.from(Array(getDay(firstDateOfMonth)).keys());

  return (
    <Container width={width}
      id={id}
      className={className ?? 'date-picker'}>
      <Header className="date-picker-header">
        <h3>
          {format(now, 'MMMM yyyy')}
        </h3>
        <Controls>
          <button
            type="button"
            title="Previous month"
            onClick={() => setNow(subMonths(now, 1))}> &lt;
    </button>
          <button
            type="button"
            title="Next month"
            onClick={() => setNow(addMonths(now, 1))}> &gt;
    </button>
        </Controls>
      </Header>
      <Grid columns={7}>
        <DayHeading>Su</DayHeading>
        <DayHeading>Mo</DayHeading>
        <DayHeading>Tu</DayHeading>
        <DayHeading>We</DayHeading>
        <DayHeading>Th</DayHeading>
        <DayHeading>Fr</DayHeading>
        <DayHeading>Sa</DayHeading>
        {
          firstDays.map((d) => <Cell key={d}></Cell>)
        }
        {
          days.map((d) => {
            const thisDay = addDays(firstDateOfMonth, d);
            const disabled = isDisabled(thisDay, disabledRanges) || isDisabledDayOfWeek(thisDay, disabledDaysOfWeek) || isPast(thisDay);
            const isActive = isSameDay(thisDay, now);
            return <Cell
              disabled={disabled}
              className={`date-picker-cell ${isActive ? ' active' : ''} ${disabled ? ' disabled' : ''}`}
              isActive={isActive}
              isToday={isToday(thisDay)}
              onClick={() => {
                if (disabled) {
                  return;
                }
                setNow(thisDay);
                if (onChange) {
                  onChange(thisDay);
                }
              }}
              key={d}>{d + 1}</Cell>;
          })
        }
      </Grid>
    </Container>
  )
}

DatePicker.defaultProps = {
  disabledRanges: [],
};

export default DatePicker;
