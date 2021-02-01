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
            Our kitchen will be opened for collection and delivery on Thursdays from 5:30pm to 8pm.<br />
Order accepted up until 12pm on Wednesday.
</Alert>
          <br />
          <ThursdayList />
        </div>
      </CardBody>
    </Layout>
  );
}
