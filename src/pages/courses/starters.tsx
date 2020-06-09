import React from 'react';

import CardBody from '../../components/CardBody';
import Layout from '../../components/mealLayout';
import StarterList from '../../components/StarterList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="meal-list">
          <StarterList />
        </div>
      </CardBody>
    </Layout>
  );
}
