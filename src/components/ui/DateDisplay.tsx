import {
  format,
  getDate,
  getYear,
} from 'date-fns';
import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {
  date: Date;
}

const DateBadge = styled.div`
  border-radius: 0.5rem;
  display: inline-block;
  width: 5rem;
  text-align: center;
  background: rgb(250,250,250);
  background: linear-gradient(0deg, rgba(250,250,250,1) 100%, rgba(235,235,235,1) 0%);
  box-shadow: 0px 0px 10px rgba(50,50,50,0.1);
  border: 1px solid rgba(50,50,50,0.1);
`;

const Year = styled.div`
  text-align: center;
  background: rgb(250,250,250);
  background: linear-gradient(0deg, rgba(250,250,250,1) 100%, rgba(235,235,235,1) 0%);
  padding: 0 0.3rem;
  color: rgb(150, 150, 150);
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Month = styled.div`
  text-align: center;
  padding: 0.25rem 0.3rem;
  background: rgb(117,1,43);
  border-top: 1px solid rgb(117,1,43);
  background: linear-gradient(0deg, rgba(117,1,43,1) 0%, rgba(231,12,84,1) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
  border-radius:  0 0 0.5rem 0.5rem ;

`;
const Day = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 0.25rem 0.3rem;
`;

export const DateDisplay: FC<Props> = ({
  date
}) => {
  const year = getYear(date);
  const day = getDate(date);
  const month = format(date, 'MMM');
  return (
    <DateBadge>
      <Year>{year}</Year>
      <Day>{day}</Day>
      <Month>{month}</Month>
    </DateBadge>
  )
}
