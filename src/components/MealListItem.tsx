import Img from 'gatsby-image';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import { useMedia } from '../hooks/useMedia';
import { formatter } from '../lib/formatter';
import AddItemForm from './AddItemForm';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { TSkuProduct } from './MealList';
import Price from './Price';

const MealImage = styled(Img) <{ direction: 'column' | 'row' }>`
  img {
  ${(props) => {
    if (props.direction !== 'column') {
      return `
        padding-left: 1rem;
        padding-top: 1rem;
      `;
    }
    return `
    border-radius:  0.3rem 0.3rem 0 0;
    `
  }}
}
`;

const FlexRow = styled.div<{ direction: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
`;


const MealCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
`;

const SkuLabel = styled.label`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
  div {
    margin: 0 0.2rem;
  }
`;

interface IProps {
  product: TSkuProduct;
}
const MealListItem: FC<IProps> = ({
  product,
}) => {
  const [isOpen, onToggle] = useState(false);
  const [selectedSKUIndex, setSelectedSKUIndex] = useState(product.selectedSKUIndex);
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 0px)'],
    [3, 2, 1],
    2
  );
  return (
    <>
      <MealCard>

        <FlexRow direction={columnCount === 1 ? 'column' : 'row'}>
          {
            product.fluid &&
            <div style={{ width: '100%' }}>
              <MealImage
                direction={columnCount === 1 ? 'column' : 'row'}
                fluid={product.fluid} alt="test"
              />
            </div>
          }

          <CardBody style={{ width: '100%' }}>
            <h3>
              {product.product.name}
            </h3>
            <div>{product.product.metadata.description}</div>
          </CardBody>
        </FlexRow>
        <CardFooter direction={columnCount === 1 ? 'column' : 'row'}>
          {
            product.skus.length === 1 &&
            <Price>
              {formatter.format(product.price / 100)}
            </Price>
          }

          {
            product.skus.length > 1 &&
            <div>
              {
                product.skus.map((sku, i) => <FlexRow key={sku.id} direction="row" >
                  <input
                    type="radio"
                    id={`sku-${sku.id}`}
                    checked={selectedSKUIndex === i}
                    name={`sku-${product.id}[]`}
                    onChange={() => setSelectedSKUIndex(i)} />
                  <SkuLabel
                    htmlFor={`sku-${sku.id}`}>
                    <div>
                      {sku.name}
                    </div>
                    <div>
                      {formatter.format(sku.price / 100)}
                    </div>
                  </SkuLabel>
                </FlexRow>)
              }
            </div>
          }
          <Button
            style={{ marginTop: columnCount === 1 ? '1rem' : 0 }}
            color="primary"
            onClick={() => {
              onToggle(true);
            }}>Order now
            </Button>
        </CardFooter>
      </MealCard>
      <AddItemForm
        isOpen={isOpen}
        onToggle={onToggle}
        product={{
          ...product,
          selectedSKUIndex,
        }} />
    </>
  );
}

export default MealListItem;
