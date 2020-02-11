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
import { ISku } from './MealList';
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
  sku?: ISku;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const AddItemForm: FC<IProps> = ({
  sku,
  isOpen,
  onToggle,
}) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(1);
  }, [sku])
  const { dispatch } = useContext(store);
  if (!sku) {
    return null;
  }
  return (
    <Modal open={isOpen}
      onClose={() => onToggle(false)}
      center
    >
      <CardBody style={{ width: '310px' }}>
        <h3>{sku.product.name}</h3>

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
            {formatter.format(sku.price / 100 * quantity)}
          </Price>
          <Button
            onClick={() => {
              dispatch({
                type: 'CART_ADD', item: {
                  ...sku,
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
