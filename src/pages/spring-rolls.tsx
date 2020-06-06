import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/mealLayout';
import StarterListDetails from '../components/StarterListDetails';

const ThisLayout = styled.div`
@media (min-width: 640px){
  margin: 10px;
}
`;

export default () => {
  return (
    <Layout>
      <ThisLayout>
        <div>
          <StarterListDetails id="c2a99bf5-b486-5bf8-849c-9ed23832e134" />
        </div>
        <div>
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
