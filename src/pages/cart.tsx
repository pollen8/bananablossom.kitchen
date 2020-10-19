import React from 'react';
import styled from 'styled-components';

import CardBody from '../components/CardBody';
import Cart from '../components/Cart';
import Layout from '../components/layout';

const ThisLayout = styled.div`
@media (min-width: 640px){
  margin: 10px;
}
`;

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <CardBody>
          <Cart />
        </CardBody>
      </ThisLayout>
    </Layout>
  );
}
