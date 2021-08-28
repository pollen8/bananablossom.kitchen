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
  queryCache,
  useMutation,
  useQuery,
} from 'react-query';
import styled from 'styled-components';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import DatePicker from '../DatePicker';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import { flatten } from './Products';

const Row = styled.div`
  display: flex;
`;

export interface IEvent {
  id: string;
  ts: string;
  date: Date | string;
  time: string;
  name: string;
  location: string;
  url: string;
}

export const fetchEvents = async (): Promise<IEvent[]> => {
  const res = await axios.post<any>("/.netlify/functions/event-list");
  return res.data.map(flatten)
}

const createEvent = async (data: Partial<IEvent>) => {
  await axios.post("/.netlify/functions/event-create", data);
}

const deleteEvent = async (selected: string[]) => {
  await axios.post("/.netlify/functions/event-delete", { ids: selected });
}

const Events: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<Partial<IEvent>>({ time: '', date: new Date(), location: '', url: '' });
  const events = useQuery<IEvent[], 'events'>('events', fetchEvents);

  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('events')
    },
  };
  const [mutate] = useMutation(createEvent, mutationOptions)
  const [deleteMutate] = useMutation(deleteEvent, mutationOptions)

  if (events.status === 'loading') {
    return <>loading....</>
  }

  if (events.status === 'error') {
    return <span>Error: {(events.error as any).message}</span>
  }

  return (
    <Row>
      <Card style={{ flexGrow: 1 }}>
        <CardBody>
          <table>
            <thead>
              <tr>
                <th>Name</th>
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
                events.data.map((data) => <tr key={data.ts}>
                  <td>{data.name}</td>
                  <td>{format(parseISO(data.date as string), 'dd MMMM yyyy')}</td>
                  <td>{data.time}</td>
                  <td>{data.location}</td>
                  <td>{data.url}</td>

                  <td>
                    <input type="checkbox"
                      value={data.id}
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
                </tr>)
              }
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div style={{ margin: '0 0 0 2rem', minWidth: '15rem' }}>
        <FormGroup>
          <Label htmlFor="name">
            Event name
          </Label>
          <Input
            id="name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">
            Date
          </Label>
          <DatePicker
            onChange={(v) => setData({ ...data, date: v })}
            id="date" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="time">
            Time
          </Label>
          <Input
            id="time"
            value={data.time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location">
            Location
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="url">
            URL
          </Label>
          <Input
            id="url"
            value={data.url}
            onChange={(e) => setData({ ...data, url: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="button"
            onClick={() => mutate(data)}
            color="primary">
            Submit
          </Button>

        </FormGroup>
      </div>
    </Row>
  );
};

export default Events;
