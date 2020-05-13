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
import CardFooter from './CardFooter';
import Price from './Price';

const MealImage = styled(Image)`
  border-radius:  0.3rem 0.3rem 0 0;
  width: 100%;
  object-fit: cover;
  object-position: center center;
  margin-bottom: 0;
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

const Info = styled.span`
  color: rgb(69, 178, 74);
  font-weight: 600;
  font-size: 0.6rem;
  padding: 0 0.2rem;
`;

const Nuts = styled(Info)`
  color: rgb(200, 100, 100);
`;

const Gluten = styled(Info)`
  color: ${(props) => props.theme.colors.blue500};
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
  const unavailable = product.skus[selectedSKUIndex].unavailable === true;
  return (
    <>
      <MealCard data-dish={`data-${product.name.replace(' ', '-')}`}>
        <FlexRow direction="column">
          {
            product.skus.length > 0 && product.skus[selectedSKUIndex].image !== '' &&
            <div style={{ width: '100%', maxHeight: '300px', position: 'relative', overflow: 'hidden' }}>
              <MealImage
                cloudName="pollen8"
                publicId={product.skus[selectedSKUIndex].image}
                quality="auto:best"
                effect="saturation:30"
                crop="scale"
                client_hints
                sizes="100vw" />
            </div>
          }

          <CardBody style={{ width: '100%' }}>
            <h3 style={{ lineHeight: '1.6rem' }}>
              {product.name}
            </h3>
            <p>{product.description}</p>
            {
              unavailable &&
              <Alert color="info">Sorry, but this isn't available at the moment</Alert>
            }
            {
              product.skus.length > 1 &&
              <div>
                {
                  product.skus.map((sku, i) => <SkuItem key={sku.id} direction="row" >
                    <input
                      type="radio"
                      id={`sku-${sku.id}`}
                      checked={selectedSKUIndex === i}
                      name={`sku-${product.id}[]`}
                      onChange={() => setSelectedSKUIndex(i)} />
                    <SkuLabel
                      htmlFor={`sku-${sku.id}`}>
                      <div>
                        {sku.name} <br />
                        {
                          sku.vegetarian && <Info title="Vegetarian">V</Info>
                        }
                        {
                          sku.vegan && <Info title="Vegan">VE</Info>
                        }
                        {
                          sku.glutenFree && <Gluten title="Gluten free">G</Gluten>
                        }
                        {
                          sku.nuts && <Nuts title="May contain nuts">N</Nuts>
                        }
                      </div>
                      <div>
                        {formatter.format(Number(sku.price))}
                      </div>
                    </SkuLabel>
                  </SkuItem>)
                }
              </div>
            }
            {
              product.skus.length === 1 &&
              <Price>
                {formatter.format(Number(product.skus[0].price))}
              </Price>
            }
          </CardBody>
        </FlexRow>
        <CardFooter direction="column" style={{ paddingTop: 0 }}>
          <Button
            disabled={unavailable}
            style={{ marginTop: columnCount === 1 ? '1rem' : 0, width: '100%' }}
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
        product={product}
        sku={product.skus[selectedSKUIndex]}
      />
    </>
  );
}

export default MealListItem;
