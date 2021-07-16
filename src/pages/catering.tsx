import {
  graphql,
  Link,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import { Spacer } from '../components/layout/Spacer';
import Stack from '../components/layout/Stack';
import {
  Bg,
  InsetBox,
} from './';

const Grid = styled.div`
grid-template auto auto / 350px 1fr;
display: grid;
grid-column-gap: 1rem;
@media (max-width: 640px){ 
  grid-template: 1fr / 1fr;
  > div:first-child  .gatsby-image-wrapper:first-child {
    display: none !important;
  }
}

`;
const Catering = () => {

  const data = useStaticQuery(graphql` 
  query {
      food1: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-1.jpg" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    food17: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-60.jpg" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}  
      
  }
  `)
  return (
    <Layout>
      <Bg>
        <InsetBox>
          <Stack>
            <div>

              <h2>
                Catering
              </h2>
              <Grid>
                <div>
                  <Img fixed={data.food1.childImageSharp.fixed} alt="Vietnamese market in Basingstoke" />
                  <Img fixed={data.food17.childImageSharp.fixed} alt="Vietnamese market in Basingstoke" />
                </div>
                <div>
                  <p>Banana Blossom can provide catering for up to 30 people, from finger buffets to sit down meals.</p>
                  <p>We can sit down with you and create a menu that is sure to delight your guests.</p>
                  <p>

                    <Spacer height="1rem" />
                    <h3>
                      <Link to="/contact">Contact us for a quote</Link>
                    </h3>
                  </p>
                </div>
              </Grid>
            </div>

          </Stack>
        </InsetBox>
      </Bg>
    </Layout>

  )
}

export default Catering;
