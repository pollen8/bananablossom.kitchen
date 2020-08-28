import React, { FC } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { IProduct } from '../admin/AddProduct';
import { fetchProductList } from '../admin/Products';
import {
  fetchPromotions,
  IPromotion,
} from '../admin/Promotions';
import Alert from '../Alert';
import Stack from '../layout/Stack';
import PromotionCodeField from './PromotionCodeField';

const Banner = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.25rem;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.green100};
  background-color: ${(props) => props.theme.colors.grey700};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const PromotionCode: FC = () => {
  const { status, error, data } = useQuery<IPromotion[], 'promotions'>('promotions', fetchPromotions);
  const products = useQuery<IProduct[], 'products'>('products', fetchProductList);
  if (status === 'loading' || products.status === 'loading') {
    return <>loading....</>
  }

  if (status === 'error' || products.status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      {
        data.length > 0 && <Alert

          color="info"
          style={{ width: '100%' }}>
          <Stack>

            <ul>
              {
                data.map((d) => <li key={d.id}>
                  Use the promotion code <code style={{ backgroundColor: '#fff', marginRight: '0.25rem' }}>
                    {d.code}</code> to get {d.percentage}% off {d.productId && products.data.find((p) => p.id === d.productId)?.name}
                </li>
                )}
            </ul>
            <PromotionCodeField />
          </Stack>
        </Alert>
      }
    </>
  )
}

export default PromotionCode;
