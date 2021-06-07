import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React, {
  FC,
  useContext,
} from 'react';
import styled from 'styled-components';

import { store } from '../context/cartContext';
import CheckoutButton from './CheckoutButton';
import Facebook from './social/Facebook';
import TripAdvisor from './TripAdvisor';

const Container = styled.div`
  position: sticky;
  padding: 0.25rem 1rem;
  background: #fff;
  bottom: 0;
  
  box-shadow: 10px 7px 14px 10px rgba(60,66,87,0.52);
 
  @media (max-width: 640px){ 
    top: auto;
    bottom: 0;
  }

  > div {
    min-height: 3rem;
    position: relative;
  text-align: center;
  }

`;
const Icons = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const MobileCheckoutPane: FC = () => {
  const { state } = useContext(store);
  const data = useStaticQuery(graphql` 
  query {
    rating: file(relativePath: { eq: "fhrs_5_en-gb.jpg" }) {
      childImageSharp {
            fixed(width: 75) {
            ...GatsbyImageSharpFixed
          } 
          }
    }
  }
  `)
  return (
    <Container>

      <div>
        {
          state.items.length > 0 &&
          <CheckoutButton />
        }

        {
          state.items.length === 0 &&
          <Icons>
            <Img fixed={data.rating.childImageSharp.fixed} alt="Food hygiene rating: 5" />
            <Facebook size={30} />
            <TripAdvisor size={30} />
          </Icons>
        }
      </div>
    </Container>
  )
}

export default MobileCheckoutPane;

/*




*/
