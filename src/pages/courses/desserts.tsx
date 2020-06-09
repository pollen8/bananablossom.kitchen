import React from 'react';

import CardBody from '../../components/CardBody';
import DessertList from '../../components/DessertList';
import Layout from '../../components/mealLayout';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="meal-list">
          <DessertList />
        </div>
      </CardBody>
    </Layout>
  );
}
