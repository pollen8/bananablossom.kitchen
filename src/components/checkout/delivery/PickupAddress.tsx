import React, { FC } from 'react';

import { IPickupLocation } from '../../../pages/checkout';
import BigCheckbox from '../../ui/BigCheckbox';
import { formatTime } from '../Calendar';

interface IProps {
  location: IPickupLocation;
  selected: boolean;
  onClick: () => void;
}

const PickupAddress: FC<IProps> = ({
  location,
  selected,
  onClick,
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
          {dt.day}
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
