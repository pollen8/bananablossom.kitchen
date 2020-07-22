import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React, { useState } from 'react';
import {
  AiFillCloseCircle,
  AiOutlineAlert,
} from 'react-icons/ai';
import styled from 'styled-components';

import { INotification } from './admin/Notification';
import { ButtonIcon } from './Button';
import { FlexRow } from './MealListItemDetails';

const GET_NOTIFICATIONS = graphql`{
   allFaunaNotification {
    nodes {
        id
        message
      }
  }
}`;

const Notice = styled.div<{ i: number }>`
  position: fixed;
  top: ${(props) => 7 + (props.i * 3)}rem;
  background: hsl(200,36%,90%);
  color: hsl(200,26%,30%);
  border: 1px solid hsl(200,56%,80%);
  height: 3rem;
  padding: 0.5rem;
  z-index: 1000;
  width: 100%;
`;

const Notifications = () => {
  const [r, setR] = useState([]);
  const { allFaunaNotification } = useStaticQuery<{ allFaunaNotification: { nodes: INotification[] } }>(GET_NOTIFICATIONS);
  console.log('allFaunaNotification', allFaunaNotification);
  if (typeof window === 'undefined') {
    return null;
  }
  const read: string[] = JSON.parse(window.localStorage.getItem('notificationsRead') ?? '[]');
  const toShow = allFaunaNotification.nodes
    .filter((n) => !read.includes(n.id));

  if (toShow.length === 0) {
    return null;

  }
  return <>
    {toShow
      .map((n, i) => <Notice key={n.id} i={i}>
        <FlexRow justifyContent="space-between">
          <FlexRow>
            <AiOutlineAlert size={20} />
            <div>
              {n.message}
            </div>
          </FlexRow> <ButtonIcon
            size="sm"
            onClick={() => {

              const read = JSON.parse(window.localStorage.getItem('notificationsRead') ?? '[]');
              window.localStorage.setItem('notificationsRead', JSON.stringify(read.concat(n.id)));
              setR(read);
            }}>
            <AiFillCloseCircle />
          </ButtonIcon>
        </FlexRow>
      </Notice>)
    }
  </>;
}

export default Notifications;
