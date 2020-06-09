import React from 'react';

import CardBody from '../../components/CardBody';
import Layout from '../../components/mealLayout';
import MealList from '../../components/MealList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="meal-list">
          <MealList />
        </div>
      </CardBody>
    </Layout>
  );
}
