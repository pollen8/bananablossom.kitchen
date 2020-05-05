import Img from 'gatsby-image';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import { useMedia } from '../hooks/useMedia';
import { formatter } from '../lib/formatter';
import AddItemForm2 from './AddItemForm';
import { IProduct } from './admin/AddProduct';
import Alert from './Alert';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import Price from './Price';

const MealImage = styled.img <{ direction: 'column' | 'row' }>`
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
  product: IProduct;
}
const MealListItem: FC<IProps> = ({
  product,
}) => {
  const [isOpen, onToggle] = useState(false);
  const [selectedSKUIndex, setSelectedSKUIndex] = useState(0);
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 0px)'],
    [3, 2, 1],
    2
  );
  console.log('product sku', product.skus[selectedSKUIndex]);
  const unavailable = product.skus[selectedSKUIndex].unavailable === true;
  return (
    <>
      <MealCard data-dish={`data-${product.name.replace(' ', '-')}`}>

        <FlexRow direction={columnCount === 1 ? 'column' : 'row'}>
          {
            product.skus.length > 0 &&
            <div style={{ width: '100%' }}>
              <MealImage
                direction={columnCount === 1 ? 'column' : 'row'}
                src={product.skus[selectedSKUIndex].image}
              />
            </div>
          }

          <CardBody style={{ width: '100%' }}>
            <h3>
              {product.name}
            </h3>
            <div>{product.description}</div>
            {
              unavailable &&
              <Alert>Sorry, but this isn't available at the moment</Alert>
            }
          </CardBody>
        </FlexRow>
        <CardFooter direction={columnCount === 1 ? 'column' : 'row'}>
          {
            product.skus.length === 1 &&
            <Price>
              {formatter.format(Number(product.skus[0].price))}
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
                      {formatter.format(Number(sku.price))}
                    </div>
                  </SkuLabel>
                </FlexRow>)
              }
            </div>
          }
          <Button
            disabled={unavailable}
            style={{ marginTop: columnCount === 1 ? '1rem' : 0 }}
            color="primary"
            onClick={() => {
              onToggle(true);
            }}>Order now
            </Button>
        </CardFooter>
      </MealCard>
      <AddItemForm2
        isOpen={isOpen}
        onToggle={onToggle}
        product={product}
        sku={product.skus[selectedSKUIndex]}
      />
    </>
  );
}

export default MealListItem;
