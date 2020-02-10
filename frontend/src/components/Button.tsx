import React, {
  ButtonHTMLAttributes,
  FC,
} from 'react';
import styled from 'styled-components';

type Status = 'primary' | 'default' | 'success';

const backgroundColor = (props: Props) => {
  const { text, color } = props;
  if (text) {
    return `transparent`;
  }
  switch (color) {
    case 'primary':
      // return '#E04969';
      return 'hsl(208, 26%, 40%)';
    case 'success':
      return '#B1CF3D';
    default:
      return 'hsl(164, 11%, 35%)';
  }
}

const hoverBackgroundColor = (props: Props) => {
  const { text, color, outline } = props;
  if (outline) {
    return `transparent`;
  }
  if (text) {
    return `transparent`;
  }
  switch (color) {
    case 'primary':
      // return '#E04969';
      return 'hsl(208, 26%, 50%)';
    case 'success':
      return '#B1CF3D';
    default:
      return 'hsl(164, 11%, 45%)';
  }
}

const hover = (props: Props) => {
  return `
  &:hover {
    background: ${hoverBackgroundColor(props)};
    color: ${props.outline || props.text ? `inherit` : '#fff'}
  }
  `;
}

const Btn = styled.button`
  font-family: 'Changa', sans-serif;
  background: ${(props) => backgroundColor(props)};
  color: ${(props) => props.text ? 'inherit' : '#fff'};
  border: 0;
  border-radius: 0.3rem;
 
  cursor: pointer;
  ${(props: Props) => hover(props)};
  ${(props: Props) => {
    switch (props.size) {
      case 'sm':
        return `
        padding: 0.1rem 0.6rem;`
      default:
      case 'md':

        return `
      padding: 0.5rem 1rem;
      `;
    }
  }}
  ${(props: Props) => {
    if (props.outline) {
      return `background: #fff;
      border: 1px solid  ${backgroundColor(props)};
      color: ${backgroundColor(props)};
      `;
    }
    return ``;
  }
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement>
  & {
    outline?: boolean;
    color?: Status;
    size?: 'sm' | 'md' | 'lg',
    text?: boolean;
  }

const Button: FC<Props> = (props) => {
  const { children, ...rest } = props;
  return <Btn {...rest}>{children}</Btn>
}

Button.defaultProps = {
  color: 'default',
  size: 'md',
  text: false,
};

export const ButtonIcon = styled.button<Props>`
  padding: 0;
  margin: 0.3rem;
  border: 0;
  background:transparent;
  font-size: ${(props) => props.size === 'lg' ? '2.5rem' : '1rem'};
  cursor: pointer;
  color: #4F625D;
  &:hover {
    color: #F5728E;
  }
`;

export default Button;
