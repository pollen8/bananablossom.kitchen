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
import MealListItem from './MealListItem';

const GET_PREORDERS = graphql`{
  allFaunaProduct {
    nodes {
      description
      id
      name
      availableDate
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

const SpecialsList = () => {

  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_PREORDERS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
    .filter((node) => node.availableDate !== null)
    .map(mergeImages(allCloudinaryMedia));

  return (
    <>
      <Grid>
        {
          products.map((product) => (
            <MealListItem
              product={product}
              key={product.id}
            />
          ))
        }

      </Grid>
    </>
  );
};

export default SpecialsList;
