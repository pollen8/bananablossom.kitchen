import React, {
  FC,
  useState,
} from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

import { useDiscount } from '../../hooks/useDiscount';
import { ButtonIcon } from '../Button';
import FormFeedback from '../FormFeedback';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.green100};
  background-color: ${(props) => props.theme.colors.grey700};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

`;


interface IProps {
  setDiscount: (v: number) => void;
}

const PromotionCode: FC<IProps> = ({ setDiscount }) => {
  const { value, checkCode, updateDiscount } = useDiscount(setDiscount);
  const [error, setError] = useState('');

  if (value === 0) {
    return (
      <FormGroup>
        <Label>
          Promotion code:
        </Label>
        <Input
          onFocus={() => setError('')}
          onBlur={async (e) => {
            window.sessionStorage.setItem('code', e.target.value);
            const res = await checkCode(e.target.value);
            const v = res?.percentage ?? 0;
            updateDiscount(v);
            if (v === 0) {
              setError('Sorry we could not find that code');
            }
          }} />
        {
          error !== '' &&
          <FormFeedback>{error}</FormFeedback>
        }
      </FormGroup>
    );

  }
  return (
    <Banner id="discount-banner">
      <strong>{value}% discount applied</strong>
      <ButtonIcon type="button"
        title="Remove"
        onClick={() => {
          window.sessionStorage.setItem('code', '');
          updateDiscount(0);
        }}>
        <AiOutlineCloseCircle />
      </ButtonIcon>
    </Banner>
  );
}


export default PromotionCode;
