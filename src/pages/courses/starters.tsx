import React from 'react';

import Cart from '../../components/Cart';
import Layout from '../../components/mealLayout';
import StarterList from '../../components/StarterList';
import { ThisLayout } from '../index';

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div id="meal-list">
          <StarterList />
        </div>
        <div id="cart">
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
