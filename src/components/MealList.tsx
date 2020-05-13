import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { IProduct } from './admin/AddProduct';
import MealListItem2 from './MealListItem';

export const Grid = styled.div<{ columnCount?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 1rem;
  margin: 0;
  grid-row-gap: 1rem;

  @media (min-width: 640px){
    margin: 0rem 2rem 0 0;
    grid-row-gap: 1rem;
  }
`;

export const mergeImages = (allCloudinaryMedia) => (product): IProduct => {
  const skus = product.skus
    .map((sku) => {
      const src = allCloudinaryMedia.nodes.find((i) => i.public_id === sku.image);
      return {
        ...sku,
        image: src ? src.public_id : '',
        secure_url: src ? src.secure_url : '',
      };
    });
  console.log(' merge images skus', skus);
  return {
    ...product,
    skus,
  };
};

export interface ICloudinaryImage {
  secure_url,
  public_id,
}

export interface ISkuNodes {
  allFaunaProduct: {
    nodes: IProduct[]
  },
  allCloudinaryMedia: {
    nodes: ICloudinaryImage[];
  }
}
const GET_MAINS = graphql`{
  allFaunaProduct(filter: {course: {eq: "main"}}) {
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
  const { allFaunaProduct, allCloudinaryMedia } = useStaticQuery<ISkuNodes>(GET_MAINS);
  const products = allFaunaProduct.nodes
    .filter((node) => Array.isArray(node.skus))
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

export default MealList;
