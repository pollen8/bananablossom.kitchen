import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/mealLayout';
import MealList from '../components/MealList';

const ThisLayout = styled.div`
@media (min-width: 640px){
  margin: 10px;
}
`;

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <Cart />
      </ThisLayout>
    </Layout>
  );
}
