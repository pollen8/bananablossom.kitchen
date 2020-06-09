import React from 'react';

import CardBody from '../../components/CardBody';
import Layout from '../../components/mealLayout';
import SidesList from '../../components/SidesList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="meal-list">
          <SidesList />
        </div>
      </CardBody>
    </Layout>
  );
}
