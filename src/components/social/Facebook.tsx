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

const Facebook = () => {
  return (
    <MediaButtonIcons
      title="Visit our Facebook page"
      onClick={() => window.location.href = "https://www.facebook.com/bananablossom.kitchen"}>
      <AiFillFacebook size={52} />
    </MediaButtonIcons>
  )
}

export default Facebook;
