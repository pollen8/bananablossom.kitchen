import React from 'react';

import Alert from '../components/Alert';
import CardBody from '../components/CardBody';
import Layout from '../components/mealLayout';
import PreOrderList from '../components/PreOrderList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="pre-order">
          <Alert color="info">
            Orders are only available for delivery on Monday's and for pick up from our market locations.</Alert>
          <br />
          <PreOrderList />
        </div>
      </CardBody>
    </Layout>
  );
}
