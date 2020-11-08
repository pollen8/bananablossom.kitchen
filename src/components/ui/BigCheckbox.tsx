import React, {
  FC,
  HTMLAttributes,
} from 'react';
import {
  AiOutlineBorder,
  AiOutlineCheckSquare,
} from 'react-icons/ai';
import styled from 'styled-components';

import { ButtonIcon } from '../Button';

const Option = styled.div<{ disabled?: boolean, align?: string } & HTMLAttributes<HTMLDivElement>>`
  display: flex;
  align-items: ${(props) => props.align ?? 'center'};
  flex-direction: column;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'default'}
  &:hover: {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }

  button div {
    margin-left: 0.5rem;
  }
`;

interface IProps {
  onClick: () => void;
  active: boolean;
  label?: string;
  title?: string;
  disabled?: boolean;
  align?: string;
}

const BigCheckbox: FC<IProps> = ({
  onClick,
  label = '',
  active,
  disabled = false,
  title,
  children,
  align = 'center',
}) => {
  return (
    <Option
      disabled={disabled}
      title={title}
      align={align}
      onClick={onClick}>
      {children}
      <ButtonIcon
        type="button"
        active={active}
        style={{ margin: 0 }}
        onClick={onClick}
      >
        {
          active
            ? <AiOutlineCheckSquare />
            : <AiOutlineBorder />
        }
        <div>
          {label}
        </div>
      </ButtonIcon>
    </Option>
  )
}

export default BigCheckbox;
