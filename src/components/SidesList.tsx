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

const SidesList = () => {
  const GET_SIDES = graphql`{
    allFaunaProduct(filter: {course: {eq: "sides"}}) {
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
          unavailable
          vegan
          vegetarian
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
  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_SIDES);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
    .map(mergeImages(allCloudinaryMedia));

  return (
    <>
      <Grid>
        {
          products.map((product) => (
            <>
              <MealListItem2
                product={product}
                key={product.id}
              />
            </>
          ))
        }

      </Grid>
    </>
  );
};

export default SidesList;
