import React from 'react';

import Cart from '../../components/Cart';
import Layout from '../../components/mealLayout';
import MealList from '../../components/MealList';
import { ThisLayout } from '../index';

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div id="meal-list">
          <MealList />
        </div>
        <div id="cart">
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
