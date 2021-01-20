import React from 'react';

import Alert from '../components/Alert';
import CardBody from '../components/CardBody';
import Layout from '../components/mealLayout';
import SpecialsList from '../components/SpecialsList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="pre-order">

          <SpecialsList />
        </div>
      </CardBody>
    </Layout>
  );
}
