import React, {
  ButtonHTMLAttributes,
  FC,
} from 'react';
import styled, { ThemedStyledProps } from 'styled-components';

type Status = 'primary' | 'default' | 'success' | 'danger';

const backgroundColor = (props: ThemedStyledProps<any, Props>) => {
  const { text, color } = props;
  if (text) {
    return `transparent`;
  }
  if (props.disabled) {
    return props.theme.colors.grey600;
  }
  switch (color) {
    case 'primary':
      // return '#E04969';
      return 'hsl(208, 26%, 40%)';
    case 'success':
      return '#B1CF3D';
    case 'danger':
      return props.theme.colors.red500;
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
  const background = props.disabled ? `` : `background: ${hoverBackgroundColor(props)}`;
  const color = props.disabled ? `` : `color: ${props.outline || props.text ? `inherit` : '#fff'}`;
  return `
  &:hover {
    ${background};
    ${color};
  }
  `;
}

const Btn = styled.button`
  font-family: 'Changa', sans-serif;
  background: ${(props) => backgroundColor(props)};
  color: ${(props) => props.text
    ? props.disabled ? '#ccc' : 'inherit'
    : '#fff'};
  border: 0;
  border-radius: 0.3rem;
  cursor:  ${(props) => props.disabled ? 'default' : 'pointer'};
 
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
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
      const color = props.text ? `` : `color: ${backgroundColor(props)}`;
      return `background: #fff;
      border: 1px solid  ${backgroundColor(props)};
      ${color};
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
    active?: boolean;
  }

const Button: FC<Props> = (props) => {
  const { children, ...rest } = props;
  return <Btn {...rest}>{children}</Btn>
}

Button.defaultProps = {
  color: 'default',
  size: 'md',
  text: false,
  active: false,
};

export const ButtonIcon = styled.button<Props>`
  padding: 0;
  margin: 0.3rem;
  border: 0;
  background:transparent;
  display: flex;
  align-items: center;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${(props) => props.size === 'lg' ? '2.5rem' : '1rem'};

  ${(props) => {
    if (props.disabled) {
      return ` color: ${props.theme.colors.grey500};`
    }
    return `color: ${props.active ? props.theme.colors.primary : '#4F625D'};`
  }}
  
  ${(props) => {
    if (props.disabled) {
      return ``;
    }
    return ` &:hover {
      color: ${props.theme.colors.primary};
    }
    `;
  }}
  svg {
    font-size: ${(props) => props.size === 'lg' ? '2.5rem' : '1.5rem'};
  }
`;

export default Button;
