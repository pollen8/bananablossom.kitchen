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

const GET_STARTERS = graphql`{
  allFaunaProduct(filter: {course: {eq: "starter"}}) {
    nodes {
      description
      id
      name
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

const MealList = () => {
  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_STARTERS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
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

export default MealList;
