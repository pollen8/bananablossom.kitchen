import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Orders from './Orders';
import Promotion from './Promotions';

const Page = styled.div`
  display: flex;
`;

const Menu = styled.div`
  width: 10rem;
  button {
    width: 100%;
    border-radius: 0;
    border-top: 1px solid ${(props) => props.theme.colors.grey500};
  }
`;

const Content = styled.div`
  padding:  0 1rem 1rem 1rem;
  flex-grow: 1;
`;

const Admin = () => {
  const [tab, setTab] = useState(0);
  return (
    <Page>
      <Menu>
        <Button onClick={() => setTab(0)} color={tab === 0 ? 'primary' : 'default'}>Orders</Button>
        <Button onClick={() => setTab(1)} color={tab === 1 ? 'primary' : 'default'}>Promotions</Button>
      </Menu>

      <Content>
        {tab === 0 && <Orders />}
        {tab === 1 && <Promotion />}
      </Content>
    </Page>
  )
}

export default Admin;
