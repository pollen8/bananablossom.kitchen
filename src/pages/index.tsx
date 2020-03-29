import React from 'react';
import styled from 'styled-components';

import Cart from '../components/Cart';
import Layout from '../components/layout';
import MealList from '../components/MealList';

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-gap: 32px;
`;

export const ThisLayout = styled.div`

#meal-list{
  margin-bottom: 6rem;
}

.main-content{
  margin-bottom: 6rem;
}
#cart {
  padding: 0.25rem;
  width: 100%;
  background-color: #fff;
  display: flex;
  box-shadow: 5px 7px 14px 10px rgba(60,66,87,0.12),0 3px 6px 0 rgba(0,0,0,0.12);
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;

  > div {
    width: 100%;
    box-shadow: none;
  }


  h3 {
    display: none;
  }

}

#controls {
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

#order-total-badge {
  display: block;
}

#cart-content {
  display: none;
}

#order-help {
  display: none;
}

#discount-banner {
  max-width: 7rem;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1rem;
}

@media (min-width: 640px){
  display: flex;

  #meal-list {
    margin-bottom: 0;
    flex-grow 1;
  }

  .main-content{
    margin-bottom: 0;
    flex-grow 1;
  }

  #cart {
    width: 250px;
    position: sticky;
    top: 11rem;
    display: block;
    background-color: transparent;
    box-shadow:none;

    h3 {
      display: block;
    }

    > div {
      width: 100%;
      box-shadow: 0 7px 14px 0 rgba(60,66,87,0.12),0 3px 6px 0 rgba(0,0,0,0.12);
    }
  }

  #order-total-badge {
    display: none;
  }

  #cart-content {
    display: grid;
  }

  #price {
    display: none;
  }

  #controls {
    display: block;

    button {
      width: auto;
      display: block;
    }
  }

  #order-help {
    display: block;
  }
}

`;

export default () => {

  return (
    <Layout>
      <ThisLayout>
        <div id="meal-list">
          <MealList />
        </div>
        <div id="cart">
          <Cart />
        </div>
      </ThisLayout>
    </Layout>
  );
}
// import React from 'react';

// import Banner from '../components/Banner';

// export default () => {
//   return <>
//     <Banner />
//   </>
// }
