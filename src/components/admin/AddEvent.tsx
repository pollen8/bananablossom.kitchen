import axios from 'axios';
import {
  format,
  parseISO,
} from 'date-fns';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  queryCache,
  useMutation,
} from 'react-query';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import { t } from 'xstate';

import {
  Event,
  EventInput,
  MutationPartialUpdateEventArgs,
  MutationPartialUpdateTicketArgs,
  Ticket,
  TicketInput,
} from '../../../generated/sdk';
import Button from '../Button';
import DatePicker from '../DatePicker';
import FormFooter from '../FormFooter';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import { FlexRow } from '../MealListItemDetails';

export const mutationOptions = {
  onSuccess: () => {
    queryCache.refetchQueries('events')
  },
};

const createEvent = async (data: EventInput) => {
  await axios.post("/.netlify/functions/event-create", data);
}

const updateEvent = async (data: MutationPartialUpdateEventArgs) => {
  return await axios.post('/.netlify/functions/event-update', data)
}

const postUpdateTicket = async (data: MutationPartialUpdateTicketArgs) => {
  return await axios.post('/.netlify/functions/event-ticket-update', data);
}

export const blankEvent: Event = {
  _id: '',
  _ts: '',
  name: '',
  time: '',
  date: new Date(),
  location: '',
  url: '',
  tickets: {
    data: []
  },
  published: false,
  places: 0,
}

const blankTicket: Ticket = {
  _id: '',
  _ts: '',
  name: '',
  price: 0,
}

interface IProps {
  event?: Event;
  onClose: () => void;
}

export const AddEvent: FC<IProps> = ({ event, onClose }) => {
  const [isOpen, onToggle] = useState(false);
  const [selected, setSelected] = useState(blankTicket);
  const [mutate] = useMutation(createEvent, mutationOptions);
  const [update] = useMutation(updateEvent, mutationOptions);
  const [updateTicket] = useMutation(postUpdateTicket, mutationOptions);
  const [data, setData] = useState<Event>(event ?? blankEvent);
  useEffect(() => {
    event && setData(event);
  }, [event]);
  return (
    <>

      <form name="add-event">
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
          <Label htmlFor="published">Published</Label>
        </FormGroup>
        <input type="checkbox"
          id="published"
          checked={data.published}
          onChange={(e) => {
            setData({ ...data, published: e.target.checked })
          }}
        />
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
          <Label htmlFor="description">
            Description
          </Label>
          <textarea id="description"
            defaultValue={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}>
          </textarea>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="places">
            Max Place (leave at 0 for unlimited)
          </Label>
          <Input type="number"
            id="places"
            defaultValue={data.places}
            onChange={(e) => setData({ ...data, places: Number(e.target.value) })}
          />
        </FormGroup>

        <FlexRow justifyContent="space-between">
          <h3>Tickets</h3>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setSelected(blankTicket);
              onToggle(true);
            }}>
            Add ticket</Button>
        </FlexRow>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          {(data.tickets?.data ?? []).map((ticket) => <tr key={ticket._id}>
            <td>{ticket.name}</td>
            <td>{ticket.price}</td>
            <td>
              <Button
                type="button"
                size="sm"
                text
                onClick={() => {
                  onToggle(true);
                  setSelected(ticket);
                }}>
                Edit
              </Button>
              <Button type="button"
                size="sm"
                text
                onClick={() => {
                  const tickets = data.tickets.data.filter((t) => t._id !== ticket._id);
                  setData({
                    ...data, tickets: {
                      data: tickets
                    }
                  })
                }}>
                Delete
              </Button>
            </td>
          </tr>)}
        </table>
        <FormGroup>


        </FormGroup>

        <FormFooter align="space-between">
          <Button
            outline
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              const { _id, _ts, tickets, date, ...rest } = data;
              const idsToKeep = data.tickets.data.map((t) => t._id);
              const existingIds = event.tickets.data.map((t) => t._id);
              const ticketsToCreate: TicketInput[] = data.tickets.data.map((t) => ({
                name: t.name,
                price: t.price,
              }))
              const ticketsToKeep = data.tickets.data.filter((t) => idsToKeep.includes(t._id));
              const disconnect: string[] = event.tickets.data.filter((t) => !idsToKeep.includes(t._id)).map((t) => t._id);


              if (data._id === '') {
                const mutateData: EventInput = {
                  ...rest,
                  date: format(typeof date === 'string' ? parseISO(date) : date, 'yyyy-MM-dd'),
                  tickets: {
                    create: ticketsToCreate,

                  }
                };
                mutate(mutateData);
              } else {
                const newTickets: TicketInput[] = data.tickets.data
                  .filter((t) => !existingIds.includes(t._id))
                  .map((t) => ({
                    name: t.name,
                    price: t.price,
                  }))
                const updateData: MutationPartialUpdateEventArgs = {
                  id: data._id,
                  data: {
                    ...rest,
                    date: format(typeof date === 'string' ? parseISO(date) : date, 'yyyy-MM-dd'),
                    tickets: {
                      create: newTickets,
                      disconnect,
                    }
                  }
                }
                update(updateData)
                ticketsToKeep.map((ticket) => {
                  const {_id, _ts, event, ...data} = ticket;
                  updateTicket({
                    data,
                    id: ticket._id,
                  })
                })
              }
            }}
            color="primary">
            {data._id === '' ? 'Create event' : 'Update event'}
          </Button>
        </FormFooter>
      </form>

      <Modal open={isOpen}
        onClose={() => onToggle(false)}
        center
      >
        <h2>{selected._id !== '' ? 'Edit' : 'Add'} Ticket Type</h2>
        <form name="edit-ticket-type">
          <FormGroup>
            <Label htmlFor="name">
              Name
            </Label>
            <Input id="name"
              value={selected.name}
              onChange={(e) => setSelected({ ...selected, name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">
              Price
            </Label>
            <Input id="price"
              value={String(selected.price)}
              onChange={(e) => setSelected({ ...selected, price: parseFloat(e.target.value) })} />
          </FormGroup>
          <FormFooter align="space-between">
            <Button type="button"
              onClick={() => onToggle(false)}>
              Cancel
            </Button>
            <Button type="button"
              onClick={() => {
                const tickets = selected._id !== ''
                  ? data.tickets.data.map((t) => t._id === selected._id ? selected : t)
                  : [
                    ...data.tickets?.data ?? [],
                    selected,
                  ]

                setData({
                  ...data, tickets: {
                    data: tickets
                  }
                });
                setSelected(blankTicket);
                onToggle(false);
              }}>
              Save
            </Button>
          </FormFooter>
        </form>
      </Modal></>
  )
}
