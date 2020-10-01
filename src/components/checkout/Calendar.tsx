import { addDays } from 'date-fns';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import { IHoliday } from '../admin/Availability';
import DatePicker from '../DatePicker';
import Label from '../Label';
import TimePicker, {
  formatAmPm,
  ITime,
} from '../TimePicker';

interface IDay {
  id: string;
  start: string;
  end: string;
}




const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


const StyledDatePicker = styled(DatePicker)`
  border: 1px solid ${(props) => props.theme.colors.grey700};
  color: ${(props) => props.theme.colors.grey500};

  .date-picker-header {
    align-items: center;
    margin-bottom: 1.5rem;
  }
  button {
    width: 2rem;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.grey500};
    &:focus {
      background-color: ${(props) => props.theme.colors.primary};
      
    }
  }
  h3 {
    font-size: 1rem;
    margin-bottom: 0;
  }

  .date-picker-cell {
    color: ${(props) => props.theme.colors.grey500};
  }
  .date-picker-cell.active {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white100};
  }
  .date-picker-cell.disabled {
    color: ${(props) => props.theme.colors.grey600};
    background-color: ${(props) => props.theme.colors.grey800};
  }
`;

const StyledTimePicker = styled(TimePicker)`

.time-picker-header {
  align-items: center;
  margin-bottom: 1.5rem;
}
border: 1px solid ${(props) => props.theme.colors.grey700};
  color: ${(props) => props.theme.colors.grey500};

  .time-picker-cell {
    color: ${(props) => props.theme.colors.grey500};
  }
  .time-picker-cell.active {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white100};
  }
  .time-picker-cell.disabled {
    color: ${(props) => props.theme.colors.grey600};
    background-color: ${(props) => props.theme.colors.grey800};
  }

  .time-picker-interval-heading {
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-weight: normal;
    font-size: 0.9rem;
  }
`;

const StyledRow = styled(Row)`
  flex-directon: row;
  @media (min-width: 640px){
    flex-directon: column;
  }
`;

const deliveryAvailability = [
  {
    start: { hour: 11, minute: 0 },
    end: { hour: 14, minute: 30, },
  },
  {
    start: { hour: 16, minute: 0 },
    end: { hour: 18, minute: 30, },
  },
];

export const times = [
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability,
  },
  {
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 15, minute: 0 },
    deliveryAvailability: [{
      start: { hour: 11, minute: 0 },
      end: { hour: 15, minute: 0, },
    }]
  }
];

interface IProps {
  handleInputChange: (key: string, value: any) => void;
  orderDate: Date;
  orderTime: ITime;
  disabledDaysOfWeek: number[];
  allFaunaHoliday: {
    nodes: IHoliday[];
  };
}

const Calendar: FC<IProps> = ({
  handleInputChange,
  orderDate,
  orderTime = { hour: 10, minute: 0 },
  disabledDaysOfWeek,
  allFaunaHoliday,
}) => {
  const [values, setValues] = useState<[Date, ITime]>([orderDate, orderTime]);
  let dayOfWeek: number = 0;
  let displayDate = '';
  try {
    displayDate = values[0].toLocaleDateString('en-GB');
    dayOfWeek = values[0].getDay();
  } catch (e) {

  }
  return (
    <>
      <div>
        <Label>Date: {displayDate}</Label>
        <StyledDatePicker
          name="order_date"
          width="300px"
          disabledDaysOfWeek={disabledDaysOfWeek}
          value={orderDate}
          onChange={(value) => {
            handleInputChange('order_date', value);
            const newDayOfWeek = value.getDay();

            const newTime = values[1].hour > times[newDayOfWeek].endTime.hour
              ? { hour: times[newDayOfWeek].endTime.hour, minute: 0 }
              : values[1].hour < times[newDayOfWeek].startTime.hour
                ? { hour: times[newDayOfWeek].startTime.hour, minute: 0 }
                : values[1]

            setValues([value, newTime]);
          }}
          disabledRanges={[
            ...allFaunaHoliday.nodes.map((n) => ({ start: new Date(n.start), end: new Date(n.end) })),
            { start: addDays(new Date(), - 2), end: addDays(new Date(), - 1) }
          ]} />
      </div>

      <div style={{ flexGrow: 1, maxWidth: '24rem' }}>
        <Label>Time: {formatTime(values[1])}</Label>
        <StyledTimePicker
          onChange={(value) => {
            handleInputChange('order_time', value);
            setValues([values[0], value]);
          }}
          value={values[1]}
          startTime={times[dayOfWeek].startTime}
          endTime={times[dayOfWeek].endTime}
          useAmPm
          hideValue
          available={times[dayOfWeek].deliveryAvailability} />
      </div>
    </>
  )
}

export const formatTime = (time: ITime) => {
  const hour = (time.hour <= 12) ? 12 : time.hour - 12;
  const ampm = (time.hour <= 12) ? 'am' : 'pm';
  const min = time.minute == 0 ? '' : `:${time.minute}`;
  return `${hour}${min}${ampm}`;
}

export default Calendar;
