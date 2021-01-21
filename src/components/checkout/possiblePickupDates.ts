import {
  addDays,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

import { IHoliday } from '../admin/Availability';
import { isDisabled } from '../DatePicker';
import { IPickupLocation } from './pickupLocations';

interface IProps {
  location: IPickupLocation;
  holidays: IHoliday[];
}

export const dayToNumber = (d: string) => {
  switch (d) {
    case 'Sunday':
      return 0;
    case 'Monday':
      return 1;
    case 'Tuesday':
      return 2;
    case 'Wednesday':
      return 3;
    case 'Thursday':
      return 4;
    case 'Friday':
      return 5;
    default:
    case 'Saturday':
      return 6;
  }
}

const startOfToday = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
const endOfTomorrow = setSeconds(setMinutes(setHours(addDays(new Date(), + 1), 23), 59), 59);

export const possiblePickupDates = ({
  location,
  holidays,
}: IProps) => {

  const monthOfDays = new Array(30).fill('')
    .map((_, i) => setSeconds(setMinutes(setHours(addDays(new Date(), i + 1), 0), 0), 0));

  const pickupDays = new Set<number>(location.daytimes.map((d) => d.day).map((d) => dayToNumber(d)))
    ;
  // Remove any holidays
  const workingMonthOfDays = monthOfDays.filter((d) => !isDisabled(d, holidays))

  const notTomorrow = workingMonthOfDays.filter((d) => !isDisabled(d, [{ start: startOfToday, end: endOfTomorrow }]))
  // Remove tomorrow from the list of days

  const onlyPickupDays = notTomorrow.filter((d) => pickupDays.has(d.getDay()));
  return onlyPickupDays;
}
