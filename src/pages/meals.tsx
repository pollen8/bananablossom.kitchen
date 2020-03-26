import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/layout';
import MealList from '../components/MealList';

const ThisLayout = styled.div`
border: 1px solid green;
@media (min-width: 640px){
  margin: 10px;
}
`;

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div>
          <MealList />
        </div>
        <div>
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
