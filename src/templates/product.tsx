import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
// import Layout from '../components/layout';
import Layout from '../components/mealLayout';
import MealListItemDetails from '../components/MealListItemDetails';

const ThisLayout = styled.div`
@media (min-width: 640px){
  margin: 10px;
}
`;

export default function BlogPost({ pageContext }) {
  return (
    <Layout>
      <ThisLayout>
        <div>
          <MealListItemDetails product={pageContext.product} />
        </div>
      </ThisLayout>
      <button onClick={() => myUndefinedFunction()}>test</button>
    </Layout>
  );
}
