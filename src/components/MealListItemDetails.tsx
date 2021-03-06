import { Image } from 'cloudinary-react';
import React, {
  FC,
  useState,
} from 'react';
import styled from 'styled-components';

import { useMedia } from '../hooks/useMedia';
import { formatter } from '../lib/formatter';
import AddItemForm from './AddItemForm';
import { IProduct } from './admin/AddProduct';
import Alert from './Alert';
import Button from './Button';
import Card from './Card';
import CardBody from './CardBody';
import Stack from './layout/Stack';
import { FoodInfo } from './meals/FoodInfo';
import Pill from './ui/Pill';

export const FlexRow = styled.div<{ direction?: 'column' | 'row', justifyContent?: string }>`
  display: flex;
  justify-content: ${(props) => props.justifyContent ?? 'initial'};
  flex-direction: ${(props) => props.direction ?? 'row'};
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

const SkuItem = styled(FlexRow)`
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;
  &:last-child {
    border-bottom: 0;
  }
  input {
    margin-right: 1rem;
  }
`;
const AvailableDay = styled.div`
  color: ${(props) => props.theme.colors.grey500};
  margin-bottom: 0.8rem;
`;

interface IProps {
  product: IProduct;
}
const MealListItemDetails: FC<IProps> = ({
  product,
}) => {
  const [isOpen, onToggle] = useState(false);
  const [selectedSKUIndex, setSelectedSKUIndex] = useState(0);
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 0px)'],
    [3, 2, 1],
    2
  );
  if (!product.skus[selectedSKUIndex]) {
    return null;
  }
  const unavailable = product.skus[selectedSKUIndex].unavailable === true;
  if (unavailable) {
    return null;
  }
  const availableDays = product.availableDays ?? [];
  return (
    <>
      <MealCard data-dish={`data-${product.name.replace(' ', '-')}`} style={{ marginBottom: '1rem', maxWidth: '70rem' }}>
        <CardBody>
          <Stack>
            {
              product.skus.length > 0 && product.skus[selectedSKUIndex].image !== '' &&
              <div style={{ margin: 0, textAlign: 'center', width: '100%', maxWidth: '50rem', maxHeight: '300px', position: 'relative', overflow: 'hidden' }}>
                <Image
                  secure
                  cloudName="pollen8"
                  publicId={product.skus[selectedSKUIndex].image}
                  quality="auto:best"
                  effect="saturation:30"
                  // crop="scale"
                  client_hints
                  fetchFormat="auto"
                  alt={`${product.name}`}
                  width="400" />
              </div>
            }

            <CardBody style={{ width: '100%' }}>
              <h3 style={{ lineHeight: '1.6rem' }}>
                {product.name}
              </h3>
              {
                availableDays.length > 0 &&
                <AvailableDay>
                  <span>Only available on: </span>
                  {
                    availableDays.map((day) => <Pill background="blue800"
                      color="grey200"
                      key={day}>{day}</Pill>)
                  }
                </AvailableDay>
              }
              <p>{product.description}</p>
              {
                unavailable &&
                <Alert color="info">Sorry, but this isn't available at the moment</Alert>
              }
              <div>
                {
                  product.skus.map((sku, i) => <SkuItem key={sku.id} direction="row" >
                    {
                      product.skus.length > 1 && <input
                        type="radio"
                        id={`sku-${sku.id}`}
                        checked={selectedSKUIndex === i}
                        name={`sku-${product.id}[]`}
                        onChange={() => setSelectedSKUIndex(i)} />
                    }
                    <SkuLabel
                      htmlFor={`sku-${sku.id}`}>
                      <div style={{ display: 'flex', flexGrow: 1 }}>
                        {sku.name} <br />
                      </div>
                      <FoodInfo sku={sku} />
                      <div>
                        {formatter.format(Number(sku.price))}
                      </div>
                    </SkuLabel>
                  </SkuItem>)
                }
              </div>
              <Button
                disabled={unavailable}
                style={{ marginTop: columnCount === 1 ? '1rem' : 0, width: '100%' }}
                color="primary"
                onClick={() => {
                  onToggle(true);
                }}>Order now
              </Button>
            </CardBody>
          </Stack>
        </CardBody>
      </MealCard>
      <AddItemForm
        isOpen={isOpen}
        onToggle={onToggle}
        product={product}
        sku={product.skus[selectedSKUIndex]}
      />
    </>
  );
}

export default MealListItemDetails;
