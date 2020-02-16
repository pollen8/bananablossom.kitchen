import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/layout';
import MealList from '../components/MealList';

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-gap: 32px;
`;

export default () => {
  return (
    <Layout>
      <Frame>
        <MealList />
        <div>
          <Cart />
        </div>
      </Frame>
    </Layout>
  );
}