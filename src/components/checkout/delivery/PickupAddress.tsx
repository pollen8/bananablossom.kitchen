import { format } from 'date-fns';
import React, { FC } from 'react';

import BigCheckbox from '../../ui/BigCheckbox';
import { formatTime } from '../Calendar';
import { IPickupLocation } from '../pickupLocations';

interface IProps {
  location: IPickupLocation;
  selected: boolean;
  onClick: () => void;
  specialDate: Date
}

const PickupAddress: FC<IProps> = ({
  location,
  selected,
  onClick,
  specialDate,
}) => {
  return (
    <div className="h-event">
      <div className="h-card">
        <h3 className="-p-name">
          <BigCheckbox
            onClick={onClick}
            active={selected}
            align="flex-start"
            label={location.name}
          >
          </BigCheckbox>
        </h3>
        {location.daytimes.map((dt) => <h4>
          {dt.day}  {
            specialDate && format(specialDate, 'dd MMMM yyyy')
          }<br /><br />
          <span className="dt-start"> {formatTime(dt.time.start)} </span>
    to <span className="dt-end">{formatTime(dt.time.end)}</span>
        </h4>)}
        <div className="p-adr">
          {Object.keys(location.address).map((type, i) => <div className={type}
            key={i}>{location.address[type]}</div>
          )}
        </div>
      </div>
    </div>
  );
}


export default PickupAddress;
