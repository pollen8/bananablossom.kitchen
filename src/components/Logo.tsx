import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import React, { FC } from 'react';

const Logo: FC<Partial<HTMLImageElement>> = ({
  alt,
}) => {
  const { allCloudinaryMedia } = useStaticQuery(graphql`
      query {
        allCloudinaryMedia(filter: {public_id: {eq: "bb_logo_text"}}) {
      nodes {
        secure_url
      }
  }
      }
  `)

  if (allCloudinaryMedia.nodes.length === 0) {
    return null;
  }
  return <img src={allCloudinaryMedia.nodes[0].secure_url} alt={alt} title={alt} height={60} />
}

export default Logo
