import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React, { FC } from 'react';

import {
  Grid,
  ISkuNodes,
  mergeImages,
} from './MealList';
import MealListItem from './MealListItem';
import MealListItemDetails from './MealListItemDetails';

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

interface Props {
  id: string;
}
const StarterListDetails: FC<Props> = ({
  id
}) => {
  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_STARTERS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
    .map(mergeImages(allCloudinaryMedia));
  console.log('products', products);
  const details = products.find((p) => p.id === id);
  if (!details) {
    return null;
  }
  console.log('details', details);
  const rest = products.filter((p) => p.id !== id);
  return (
    <>
      <div>
        <MealListItemDetails product={details} />
      </div>
      <Grid>
        {
          rest.map((product) => (
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

export default StarterListDetails;
