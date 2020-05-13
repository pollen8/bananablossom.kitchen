import React, { FC } from 'react';
import styled from 'styled-components';

import { ISku } from '../admin/AddProduct';

const Info = styled.span`
  color: rgb(69, 178, 74);
  font-weight: 600;
  font-size: 0.6rem;
  padding: 0 0.1rem;
`;

const Nuts = styled(Info)`
  color: rgb(200, 100, 100);
`;

const Gluten = styled(Info)`
  color: ${(props) => props.theme.colors.blue500};
`;

interface IProps {
  sku: ISku;
}
const FoodInfo: FC<IProps> = ({ sku }) => {
  return (
    <Info>
      {
        (sku.vegetarian && !sku.vegan) && <Info title="Suitable for vegetarian">V</Info>
      }
      {
        sku.vegan && <Info title="Suitable for vegetarians and vegan">VE</Info>
      }
      {
        sku.glutenFree && <Gluten title="Gluten free">G</Gluten>
      }
      {
        sku.nuts && <Nuts title="May contain nuts">N</Nuts>
      }
    </Info>
  )
}

export default FoodInfo;
