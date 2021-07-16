import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React from 'react';

import {
  Grid,
  ISkuNodes,
  mergeImages,
} from './MealList';
import MealListItem2 from './MealListItem';

const GET_PREORDERS = graphql`{
  allFaunaProduct {
    nodes {
      description
      id
      name
      availableDate
      availableDays
      skus {
        id,
        glutenFree
        image
        name
        price
        vegan
        vegetarian
        unavailable
        nuts
        fish
        soy
        lactose
        celery
        egg
      }
    }
  }

  allCloudinaryMedia {
    nodes {
      public_id
      secure_url
    }
  }
}`;

const ThursdayList = () => {

  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_PREORDERS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
    .filter((node) => node.id !== 'f44dee22-3c27-5989-9e59-b47824973209')
    .filter((node) => node.availableDate === null)
    .map(mergeImages(allCloudinaryMedia));
  return (
    <>
      <Grid>
        {
          products.map((product) => (
            <MealListItem2
              product={product}
              key={product.id}
            />
          ))
        }

      </Grid>
    </>
  );
};

export default ThursdayList;
