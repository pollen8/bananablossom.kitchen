import axios from 'axios';
import { parse } from 'date-fns';
import { Link } from 'gatsby';
import React, {
  FC,
  Fragment,
  useContext,
  useState,
} from 'react';
import { useQuery } from 'react-query';

import {
  Event,
  Ticket as ITicket,
} from '../../generated/sdk';
import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import CheckoutButton from '../components/CheckoutButton';
import { Spacer } from '../components/layout/Spacer';
import Layout from '../components/mealLayout';
import { DateDisplay } from '../components/ui/DateDisplay';
import { store } from '../context/cartContext';

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await axios.post<any>("/.netlify/functions/event-published-list");
  return res.data.data;
}

export default () => {
  const events = useQuery<Event[], 'events'>('events', fetchEvents);
  const { state } = useContext(store);


  if (events.status === 'loading') {
    return <>loading....</>
  }

  if (events.status === 'error') {
    return <span>Error: {(events.error as any).message}</span>
  }

  return (
    <Layout>
      <CardBody>
        <div id="events">
          {
            events.data.length === 0 &&
            <>
              <h1>Events</h1>
              <p>We've not got any upcoming events planned at the moment.</p>
            </>
          }
          {
            events.data.map((event) => <>
              <Card key={event._id} id={`event_${event._id}`}>
                <CardBody>
                  <div style={{ display: 'grid', gridTemplateColumns: "7rem 1fr" }}>
                    <div>
                      <DateDisplay date={typeof event.date === 'string' ? parse(event.date, 'yyyy-MM-dd', new Date()) : event.date} />
                    </div>
                    <div>
                      <h2>
                        {event.name}
                      </h2>
                      {event.places && <div>Places: {event.places}</div>}
                      

                      <p>{event.description}</p>
                      <div style={{ display: 'grid', rowGap: '1rem', gridTemplateColumns: '1fr 1fr', justifyContent: "space-between" }}>

                        {
                          (event?.tickets?.data ?? []).map((ticket) => <Ticket
                            event={event}
                            ticket={ticket}
                            key={ticket._id} />)
                        }

                        <div></div>
                        <div style={{ justifySelf: 'flex-end' }}>
                          {
                            state.items.length > 0 &&
                            <CheckoutButton size="sm" />
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </CardBody>
              </Card>
              <Spacer height="1rem" />
            </>)
          }
        </div>

      </CardBody>
    </Layout>

  )
}

const Ticket: FC<{ ticket: ITicket, event: Event }> = ({
  event,
  ticket,
}) => {
  const { dispatch, state } = useContext(store);
  const [num, setNum] = useState(1);
  return (
    <>
      <div>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1.1rem' }}>{ticket.name}</h3>
        <div>{formatter.format(ticket.price)}</div>
      </div>
      <div style={{ justifySelf: 'flex-end' }}>
        <label>
          Number of tickets:
          <Spacer width="0.5rem" />
          <input type="number" defaultValue={num}
            style={{ width: '3rem' }}
            onChange={(e) => setNum(Number(e.target.value))} />
        </label>
        <Spacer width="1rem" />
        <Button
          size="sm"
          onClick={() => {
            const product = { ...event, id: event._id };
            const sku = { ...ticket, id: ticket._id }
            dispatch({
              type: 'CART_ADD', item: {
                product,
                quantity: num,
                sku,
              }
            });
          }}
        >Sign up</Button>
      </div>
    </>
  )
}
