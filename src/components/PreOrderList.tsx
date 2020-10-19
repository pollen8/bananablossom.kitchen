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
  allFaunaProduct(filter: {id: {in: ["f44dee22-3c27-5989-9e59-b47824973209"]}}) {
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

const PreOrderList = () => {

  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_PREORDERS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
    .map(mergeImages(allCloudinaryMedia));
  console.log('products', products);
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

export default PreOrderList;
