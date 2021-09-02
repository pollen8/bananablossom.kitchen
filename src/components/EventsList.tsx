import { format } from 'date-fns';
import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { IEvent } from './admin/Events';

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

export interface ISkuNodes {
  allFaunaEvents: {
    nodes: IEvent[]
  },

}
const GET_EVENTS = graphql`{
  allFaunaEvents {
    nodes {
      date
      location
      name
      time
      url
      id: _id
    }
  }

}`;
const EventsList = () => {
  const { allFaunaEvents } = useStaticQuery<ISkuNodes>(GET_EVENTS);
  const events = allFaunaEvents.nodes

  return (
    <>
      {
        events.map((event) =>
          // <Card key={event.id} className="h-event">
          <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            <h4 className="p-name">
              <a href={event.url}>{event.name}</a>
            </h4>
            <h5 style={{ marginBottom: '0.5rem' }}>
              {format(new Date(event.date), 'EEEE io MMMM yyyy')} - {event.time}
            </h5>
            <div className="p-location">
              {event.location}
            </div>

          </div>
        )
      }
    </>
  );
};

export default EventsList;
