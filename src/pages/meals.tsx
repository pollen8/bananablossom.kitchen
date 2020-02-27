import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/layout';
import MealList from '../components/MealList';
import { useMedia } from '../hooks/useMedia';

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-gap: 32px;
`;

export default () => {
  const columnCount = useMedia(
    // Media queries
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // Column counts (relates to above media queries by array index)
    [3, 2, 1],
    // Default column count
    2
  );
  console.log('columnCount', columnCount);
  return (
    <Layout>
      <Frame>
        <MealList />
        <div>
          <Cart />
        </div>
      </Frame>
    </Layout>
  );
}
