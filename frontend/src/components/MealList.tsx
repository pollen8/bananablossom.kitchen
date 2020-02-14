import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import MealListItem from './MealListItem';

const Grid = styled.div`
  margin: 3rem 5rem 0 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 4rem;
  grid-row-gap: 4rem;
`;

export interface ISku {
  id: string;
  image: string;
  price: number;
  currency: FunctionStringCallback;
  product: {
    id: string;
    metadata: {
      description: string;
      vegetarian: string;
      vegan: string;
      gluten_free: string;
      may_contain_nuts: string;
    }
    name: string;
  },
  attributes: {
    name: string;
  };
  quantity?: number;
}

interface ISkuNodes {
  skus: {
    nodes: ISku[]
  }
}

export type TSkuProduct = ISku & {
  selectedSKUIndex: number;
  skus: Array<{
    id: string;
    price: number;
    name: string;
  }>
}

const GET_PRODUCTS = graphql`{
    skus: allStripeSku {
    nodes {
      id
      product {
        id,
        metadata {
          description
          vegetarian
          vegan
          gluten_free
          may_contain_nuts
        }
        name
      }
      attributes {
        name
      }
      price
      image
      currency
    }
  }
}
`;


const MealList = () => {
  const { skus } = useStaticQuery<ISkuNodes>(GET_PRODUCTS);
  const products = skus.nodes.reduce((prev, next) => {
    const i = prev.findIndex((p) => p.product.id === next.product.id);
    if (i === -1) {
      return [
        ...prev,
        {
          ...next,
          selectedSKUIndex: 0,
          skus: [
            { id: next.id, price: next.price, name: next.attributes.name },
          ]
        }
      ];
    }
    prev[i].skus = [
      ...prev[i].skus,
      { id: next.id, price: next.price, name: next.attributes.name },
    ]
    return prev;
  }, [] as TSkuProduct[]);
  return (
    <>
      <Grid >
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
