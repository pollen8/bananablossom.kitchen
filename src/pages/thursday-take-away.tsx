import React from 'react';

import Alert from '../components/Alert';
import CardBody from '../components/CardBody';
import Layout from '../components/mealLayout';
import ThursdayList from '../components/ThursdayList';

export default () => {
  return (
    <Layout>
      <CardBody>
        <div id="pre-order">
          <Alert color="info">
            Our kitchen will be opened for collection on Thursdays from 5pm to 7pm.<br />
            Order accepted up until 12pm on Wednesday.
          </Alert>
          <br />
          <ThursdayList />
        </div>
      </CardBody>
    </Layout>
  );
}
