import React, { FC } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { useDiscount } from '../../hooks/useDiscount';
import { IPromotion } from '../admin/Promotions';
import { ButtonIcon } from '../Button';
import FormFeedback from '../FormFeedback';
import FormGroup from '../FormGroup';
import Input from '../Input';

const Banner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.green100};
  background-color: ${(props) => props.theme.colors.green500};
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
`;

interface IProps {
  setDiscount?: (promotion: Partial<IPromotion>) => void;
}

const PromotionCodeField: FC<IProps> = () => {
  const { promotion, updateDiscount, search, error, setError } = useDiscount();

  if (promotion.percentage === 0) {
    return (
      <FormGroup>
        <Input
          placeholder="Promotion code..."
          onFocus={() => setError('')}
          onKeyPress={(e: any) => {
            if (e.key === 'Enter') {
              search(e.target.value);
            }
          }}
          onBlur={async (e) => {
            search(e.target.value)
          }} />
        {
          error !== '' &&
          <FormFeedback>{error}</FormFeedback>
        }
      </FormGroup>
    );

  }
  return (
    <div>
      <Banner id="discount-banner">
        <strong>{promotion.percentage}% discount applied</strong>
        <ButtonIcon
          type="button"
          title="Remove"
          onClick={() => {
            window.sessionStorage.setItem('code', '');
            updateDiscount({ percentage: 0 });
          }}>
          <AiOutlineCloseCircle />
        </ButtonIcon>
      </Banner>
    </div>
  );
}

export default PromotionCodeField;
