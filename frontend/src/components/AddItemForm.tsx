import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import { formatter } from '../lib/formatter';
import Button, { ButtonIcon } from './Button';
import CardBody from './CardBody';
import { IMeal } from './MealList';
import Price from './Price';

const QuantitySelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

const Quantity = styled.div`
  font-size:2rem;
  font-weight: bold;
`;

interface IProps {
  meal?: IMeal;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const AddItemForm: FC<IProps> = ({
  meal,
  isOpen,
  onToggle,
}) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(1);
  }, [meal])
  const { dispatch } = useContext(store);
  if (!meal) {
    return null;
  }
  return (
    <Modal open={isOpen}
      onClose={() => onToggle(false)}
      center
    >
      <CardBody style={{ width: '310px' }}>
        <h3>{meal.title}</h3>

        <QuantitySelector>
          <div>
            <ButtonIcon
              size="lg"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}>
              <AiOutlineMinusCircle />
            </ButtonIcon>

          </div>
          <Quantity>{quantity}</Quantity>
          <div>
            <ButtonIcon
              size="lg"
              onClick={() => setQuantity(quantity + 1)}>
              <AiOutlinePlusCircle />
            </ButtonIcon>
          </div>
        </QuantitySelector>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Button
            outline
            onClick={() => onToggle(false)}
          >
            Cancel
          </Button>
          <Price>
            {formatter.format(meal.price * quantity)}
          </Price>
          <Button
            onClick={() => {
              dispatch({
                type: 'CART_ADD', item: {
                  ...meal,
                  quantity,
                }
              });
              onToggle(false);
            }}
          >
            Add to cart
        </Button>
        </div>
      </CardBody>
    </Modal>

  )
}

export default AddItemForm;
