import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import styled from 'styled-components';

import { ButtonIcon } from '../Button';

const MediaButtonIcons = styled(ButtonIcon)`
  display: none;
  @media (min-width: 640px){ 
    display: block;
  }
`;

interface IProps {
  size?: 52,
}
const Facebook: FC<IProps> = ({ size = 52 }) => {
  return (
    <MediaButtonIcons
      title="Visit our Facebook page"
      onClick={() => window.location.href = "https://www.facebook.com/bananablossom.kitchen"}>
      <AiFillFacebook size={size} />
    </MediaButtonIcons>
  )
}

Facebook.defaultProps = {
  size: 52,
}

export default Facebook;
