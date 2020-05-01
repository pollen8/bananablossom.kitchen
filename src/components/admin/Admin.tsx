import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Orders from './Orders';
import Products from './Products';
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
  console.log('Amin render');
  const [tab, setTab] = useState(0);
  return (
    <Page>
      <Menu>
        <Button onClick={() => setTab(0)} color={tab === 0 ? 'primary' : 'default'}>Orders</Button>
        <Button onClick={() => setTab(1)} color={tab === 1 ? 'primary' : 'default'}>Promotions</Button>
        <Button onClick={() => setTab(2)} color={tab === 2 ? 'primary' : 'default'}>Products</Button>
      </Menu>

      <Content>
        {tab === 0 && <Orders />}
        {tab === 1 && <Promotion />}
        {tab === 2 && <Products />}
      </Content>
    </Page>
  )
}

export default Admin;
