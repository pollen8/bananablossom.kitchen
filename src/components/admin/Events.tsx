import axios from 'axios';
import {
  format,
  parseISO,
} from 'date-fns';
import React, {
  FC,
  useState,
} from 'react';
import {
  useMutation,
  useQuery,
} from 'react-query';
import styled from 'styled-components';

import { Event } from '../../../generated/sdk';
import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import { Tr } from '../layout/Tr';
import {
  AddEvent,
  blankEvent,
  mutationOptions,
} from './AddEvent';

const Row = styled.div`
  display: flex;
`;

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await axios.post<any>("/.netlify/functions/event-list");
  return res.data.data;
}

const deleteEvent = async (selected: string[]) => {
  await axios.post("/.netlify/functions/event-delete", { ids: selected });
}


const Events: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [hightlighted, setHighlighted] = useState<Event>();
  const [showSideBar, setShowHideBar] = useState(false);

  const events = useQuery<Event[], 'events'>('events', fetchEvents);

  const [deleteMutate] = useMutation(deleteEvent, mutationOptions)

  if (events.status === 'loading') {
    return <>loading....</>
  }

  if (events.status === 'error') {
    return <span>Error: {(events.error as any).message}</span>
  }

  return (
    <>
      <Button type="button"
        onClick={() => {
          setShowHideBar(true);
          setHighlighted(blankEvent)
        }}>New Event
      </Button>
      <Row>

        <Card style={{ flexGrow: 1 }}>
          <CardBody>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Published</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>URL</th>
                  <th>
                    <Button size="sm"
                      onClick={async () => {
                        deleteMutate(selected);
                      }}
                    >delete</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  events.data.map((data) => <Tr key={data._ts}
                    onClick={() => {
                      setShowHideBar(true);
                      setHighlighted(data);
                    }}>
                    <td>{data.name}</td>
                    <td>{data.published ? '\u2705' : '\u274c'}</td>
                    <td>{format(parseISO(data.date as string), 'dd MMMM yyyy')}</td>
                    <td>{data.time}</td>
                    <td>{data.location}</td>
                    <td>{data.url}</td>

                    <td>
                      <input type="checkbox"
                        value={data._id}
                        onChange={(e) => {
                          e.preventDefault();
                          if (e.target.checked) {
                            selected.push(e.target.value);
                            setSelected(selected);
                          } else {
                            setSelected(selected.filter((s) => s !== e.target.value));
                          }
                        }}
                      />
                    </td>
                  </Tr>)
                }
              </tbody>
            </table>
          </CardBody>
        </Card>

        <div style={{ margin: '0 0 0 2rem', minWidth: '35rem' }}>
          {
            showSideBar && <AddEvent event={hightlighted}
              onClose={() => setShowHideBar(false)} />
          }

        </div>
      </Row>
    </>
  );
};

export default Events;
