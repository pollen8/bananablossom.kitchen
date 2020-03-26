import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React, { FC } from 'react';

const Banner: FC<Partial<HTMLImageElement>> = ({
  alt,
}) => {

  const data = useStaticQuery(graphql`
query {
  banner: file(relativePath: { eq: "banner.png" }) {
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`)

  console.log('data', data);
  return <Img fluid={data.banner.childImageSharp.fluid} alt={alt} title={alt} />
}

export default Banner
