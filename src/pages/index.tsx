import React, { Fragment } from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/layout';
import MealList from '../components/MealList';
import MobileCart from '../components/MobileCart';
import { useMedia } from '../hooks/useMedia';

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-gap: 32px;
`;

export default () => {
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 0px)'],
    [3, 2, 1],
    2
  );
  console.log('columnCount', columnCount);
  const Div = columnCount === 1 ? Fragment : Frame;
  return (
    <>
      <Layout>
        <Div>
          <MealList />
          {columnCount > 1 && <div><Cart /> </div>}
        </Div>
      </Layout>
      {columnCount === 1 && <MobileCart />}
    </>
  );
}
