import React, { FC } from 'react';
import styled from 'styled-components';

import {
  allergens,
  IAllergen,
} from '../../data/allergens';
import { ISku } from '../admin/AddProduct';

const Info = styled.span<IAllergen>`
  color:${(props) => props.color};
  font-weight: 600;
  font-size: 0.6rem;
  padding: 0 0.1rem;
`;

interface IProps {
  sku: ISku;
}
const FoodInfo: FC<IProps> = ({ sku }) => {
  console.log('sku', sku);
  return (
    <>
      {
        allergens.map((allergen) => sku[allergen.id] && <Info
          {...allergen}
          title={allergen.label}>
          {allergen.symbol}
        </Info>)
      }
    </>
  )
}

export default FoodInfo;
