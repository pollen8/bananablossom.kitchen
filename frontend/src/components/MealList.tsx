import {
  graphql,
  Link,
  useStaticQuery,
} from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';

import { formatter } from '../lib/formatter';
import AddItemForm from './AddItemForm';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Price from './Price';

const Grid = styled.div`
  margin: 3rem 5rem 0 5rem;
  display: grid;
  grid-template-columns: 50% 50%;
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
    metadata: {
      description: string;
      vegetarian: string;
      vegan: string;
      gluten_free: string;
      may_contain_nuts: string;
    }
    name: string;
  },
  quantity?: number;
}

interface ISkuNodes {
  skus: {
    nodes: ISku[]
  }
}

const GET_PRODUCTS = graphql`{
    skus: allStripeSku {
    nodes {
      id
      product {
        metadata {
          description
          vegetarian
          vegan
          gluten_free
          may_contain_nuts
        }
        name
      }
      price
      image
      currency
    }
  }
}
`;

const MealCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
`;

const MealImage = styled.img`
  max-height: 10rem;
  padding-left: 1rem;
  padding-top: 1rem;
  max-width: 100%;
`;

const FlexRow = styled.div`
  display: flex;
`;

const MealList = () => {
  const { skus } = useStaticQuery<ISkuNodes>(GET_PRODUCTS);
  const [isOpen, onToggle] = useState(false);
  const [activeSku, setActiveSku] = useState<ISku>();

  return (
    <>
      <Grid >
        {
          skus.nodes.map((sku) => (
            <MealCard
              key={sku.id}
            >
              <FlexRow>
                {
                  sku.image && <MealImage
                    src={sku.image}
                  />
                }

                <CardBody>
                  <h3>
                    {sku.product.name}
                  </h3>
                  <div>{sku.product.metadata.description}</div>
                </CardBody>
              </FlexRow>
              <CardFooter>
                <Price>
                  {formatter.format(sku.price / 100)}
                </Price>
                <Link
                  to={`/meals?id=${sku.id}`}
                >
                  <>
                    <Button
                      color="primary"
                      onClick={() => {
                        setActiveSku(sku);
                        onToggle(true)
                      }}>Order now
                    </Button>
                  </>
                </Link>
              </CardFooter>
            </MealCard>
          ))
        }

      </Grid>
      <AddItemForm
        isOpen={isOpen}
        onToggle={onToggle}
        sku={activeSku} />
    </>
  );
};

export default MealList;
