import React from 'react';

import Cart from '../../components/Cart';
import DessertList from '../../components/DessertList';
import Layout from '../../components/mealLayout';
import { ThisLayout } from '../index';

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div id="meal-list">
          <DessertList />
        </div>
        <div id="cart">
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
