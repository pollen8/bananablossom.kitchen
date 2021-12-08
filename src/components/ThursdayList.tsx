import {
  isFuture,
  isThursday,
} from 'date-fns';
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
    // Meal must either not be set to be available on a specific day (a special), or on a future Thursday
    .filter((node) => node.availableDate === null || (isThursday(new Date(node.availableDate)) && isFuture(new Date(node.availableDate))))
    .map(mergeImages(allCloudinaryMedia))
    // Hack as Pho wasn't being saved with available.
    .map((node) => node.name === 'Phở bò - Beef noodle soup'
      ? {
        ...node,
        skus: node.skus.map((sku) => ({ ...sku, unavailable: false }))
      }
      : node);
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
