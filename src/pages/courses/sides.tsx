import React from 'react';

import Cart from '../../components/Cart';
import Layout from '../../components/mealLayout';
import SidesList from '../../components/SidesList';
import { ThisLayout } from '../index';

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div id="meal-list">
          <SidesList />
        </div>
        <div id="cart">
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
