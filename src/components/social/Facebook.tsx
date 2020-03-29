import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';

import { ButtonIcon } from '../Button';

const Facebook = () => {
  return (
    <ButtonIcon
      title="Visit our Facebook page"
      onClick={() => window.location.href = "https://www.facebook.com/bananablossom.kitchen"}>
      <AiFillFacebook size={52} />
    </ButtonIcon>
  )
}

export default Facebook;
