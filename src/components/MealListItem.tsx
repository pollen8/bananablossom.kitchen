import { Link } from 'gatsby';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import { formatter } from '../lib/formatter';
import AddItemForm from './AddItemForm';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { TSkuProduct } from './MealList';
import Price from './Price';

const MealImage = styled.img`
  max-height: 10rem;
  padding-left: 1rem;
  padding-top: 1rem;
  max-width: 100%;
`;

const FlexRow = styled.div`
  display: flex;
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
  return (
    <>
      <MealCard>
        <FlexRow>
          {
            product.image && <MealImage
              src={product.image}
            />
          }

          <CardBody>
            <h3>
              {product.product.name}
            </h3>
            <div>{product.product.metadata.description}</div>
          </CardBody>
        </FlexRow>
        <CardFooter>
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
                product.skus.map((sku, i) => <FlexRow key={sku.id} >
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
          <>
            <Button
              color="primary"
              onClick={() => {
                onToggle(true);
              }}>Order now
            </Button>
          </>
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
