import React, { FC } from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import styled from 'styled-components';

import { ButtonIcon } from '../Button';

const MediaButtonIcons = styled(ButtonIcon)`
  padding: 0;
  margin-top: 0;
`;

interface IProps {
  size?: number,
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
