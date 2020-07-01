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
import FormGroup from '../FormGroup';
import Label from '../Label';
import Stack from '../layout/Stack';
import TextArea from '../TextArea';
import {
  flatten,
  Table,
  Tr,
} from './Products';

export interface INotification {
  id?: string;
  message: string;
}

export const fetchList = async () => {
  const res = await axios.post("/.netlify/functions/notification-list");
  const r = res.data.map(flatten);
  return r;
}

const deleteNotification = async (selectedRows: string[]) => {
  await axios.post("/.netlify/functions/notification-delete", { ids: selectedRows });
}

const createNotification = async (holiday: INotification) => {
  await axios.post("/.netlify/functions/notification-create", holiday);
}


const Availability: FC<RouteComponentProps> = () => {
  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('notifications')
    },
  };
  const [mutate] = useMutation(createNotification, mutationOptions)
  const [deleteMutate] = useMutation(deleteNotification, mutationOptions)
  const [formData, setFormData] = useState<INotification>({ message: '' });

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const notifications = useQuery<INotification[], 'notifications'>('notifications', fetchList);
  if (notifications.status === 'loading') {
    return <>loading....</>
  }

  if (notifications.status === 'error') {
    return <span>Error: {notifications.error.message}</span>
  }
  return (
    <>
      <h1>Notifications</h1>
      <p>These appear as dismissable alerts</p>
      <Stack reverse>
        <Card>

          <CardBody>
            <Table style={{ backgroundColor: '#fff' }}>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>
                    <Button size="sm"
                      onClick={async () => {
                        deleteMutate(selectedRows);
                        setSelectedRows([]);
                      }}
                    >delete</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  notifications
                    .data
                    .map((data) => <Tr
                      key={data.id}
                      onClick={() => {
                        setFormData(data);
                      }}>
                      <td>
                        {data.message}
                      </td>
                      <td>
                        <input type="checkbox"
                          value={data.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              selectedRows.push(e.target.value);
                              setSelectedRows(selectedRows);
                            } else {
                              setSelectedRows(selectedRows.filter((s) => s !== e.target.value));
                            }
                          }}
                        />
                      </td>
                    </Tr>
                    )
                }

              </tbody>
            </Table>
          </CardBody>
        </Card>
        <div>
          <form>
            <h3>Add notification</h3>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                id="message" />
            </FormGroup>

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

