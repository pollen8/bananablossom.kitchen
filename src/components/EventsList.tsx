import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { Event } from '../../generated/sdk';

export const Grid = styled.div<{ columnCount?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  margin: 0;
  grid-row-gap: 1rem;

  @media (min-width: 640px){
    margin: 0rem 2rem 0 0;
    grid-row-gap: 1rem;
  }
`;

const fetchEvents = async () => {
  try {
    const res = await axios.post("/.netlify/functions/event-published-list");
    return res.data.data;
  } catch (e) {
    return [];
  }
}

const EventsList = () => {
  const res = useQuery<Event[], 'events'>('events', fetchEvents);

  if (res.isLoading) {
    return null;
  }
  const events = res?.data ?? [];
  if (events.length === 0) {
    return <p>We've not got any upcoming events planned at the moment.</p>
  } 
  return (
    <>
      {
        events.map((event) =>
          <div
          key={event._id}
          style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <h4 className="p-name">
              <a href={event.url}>{event.name}</a>
            </h4>
            <h5 style={{ marginBottom: '0.5rem' }}>
              {format(new Date(event.date), 'EEEE do MMMM yyyy')} - {event.time}
            </h5>
            <div className="p-location">
              {event.location}
            </div>
            <a href={`/events#event_${event._id}`}>details &amp; tickets</a>
          </div>
        )
      }
    </>
  );
};

export default EventsList;
