import axios from 'axios';
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

import { RouteComponentProps } from '@reach/router';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import DatePicker from '../DatePicker';
import FormGroup from '../FormGroup';
import Label from '../Label';
import Stack from '../layout/Stack';
import { flatten } from './Products';

export interface IHoliday {
  id?: string;
  start: Date;
  end: Date;
}

export const fetchHolidayList = async () => {
  const res = await axios.post("/.netlify/functions/holiday-list");
  const r = res.data.map(flatten)
    .map((d) => ({
      id: d.id,
      start: new Date(d.start),
      end: new Date(d.end),
    }));
  return r;
}

const deleteHoliday = async (selectedRows: string[]) => {
  await axios.post("/.netlify/functions/holiday-delete", { ids: selectedRows });
}

const createHoliday = async (holiday: IHoliday) => {
  console.log('create holiday ', holiday);
  await axios.post("/.netlify/functions/holiday-create", holiday);
}


const Table = styled.table`
@media (max-width: 640px){ 
.description {
  display:none;
}
`;

const FlexRow = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Availability: FC<RouteComponentProps> = () => {
  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('holidays')
    },
  };
  const [mutate] = useMutation(createHoliday, mutationOptions)
  const [deleteMutate] = useMutation(deleteHoliday, mutationOptions)
  const [formData, setFormData] = useState<IHoliday>({ start: new Date(), end: new Date() });

  const holidays = useQuery<IHoliday[], 'holidays'>('holidays', fetchHolidayList);
  if (holidays.status === 'loading') {
    return <>loading....</>
  }

  if (holidays.status === 'error') {
    return <span>Error: {holidays.error.message}</span>
  }
  console.log('holidays', holidays.data);
  return (
    <>
      <h1>Time off</h1>
      <Stack reverse>
        <Card>

          <CardBody>
            <DatePicker
              selectedRanges={holidays.data}
              onChange={(v) => console.log(v)} />
          </CardBody>
        </Card>
        <div>
          <form>
            <h3>Add holiday</h3>
            <FlexRow>
              <FormGroup>
                <Label htmlFor="startDate">From</Label>
                <DatePicker
                  onChange={(v) => setFormData({ ...formData, start: v })}
                  id="startDate" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="endDate">To</Label>
                <DatePicker
                  onChange={(v) => setFormData({ ...formData, end: v })}
                  id="endDate" />
              </FormGroup>
            </FlexRow>
            <Button
              type="button"
              onClick={() => {
                mutate(formData)
              }}>Save
              </Button>
          </form>

        </div>
      </Stack>
    </>
  )
}

export default Availability;

