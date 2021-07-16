import 'rc-tooltip/assets/bootstrap_white.css';

import Tooltip from 'rc-tooltip';
import React, { FC } from 'react';
import styled from 'styled-components';

import {
  allergens,
  IAllergen,
} from '../../data/allergens';
import { ISku } from '../admin/AddProduct';
import CardBody from '../CardBody';

const Info = styled.span<IAllergen>`
  color:${(props) => props.color};
  font-weight: 600;
  font-size: 0.6rem;
  padding: 0 0.1rem;
`;

interface IProps {
  sku: ISku;
}

const TipContent: FC<IProps> = ({ sku }) => {
  return (
    <CardBody>
      <ul style={{ listStyle: 'none' }}>
        {
          allergens.map((allergen) => sku[allergen.id] && <li style={{ marginBottom: '0.5rem' }}>
            {allergen.label}
          </li>)
        }
      </ul>
    </CardBody>
  )
}

export const FoodInfo: FC<IProps> = ({ sku }) => {
  return (
    <Tooltip
      placement="top" trigger={['click']}
      overlay={<TipContent sku={sku} />}>
      <div >
        {
          allergens.map((allergen) => sku[allergen.id] && <Info
            {...allergen}
            title={allergen.label}>
            {allergen.symbol}
          </Info>)
        }
      </div>
    </Tooltip>
  )
}
