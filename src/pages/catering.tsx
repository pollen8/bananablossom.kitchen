import {
  graphql,
  Link,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import CardBody from '../components/CardBody';
import Layout from '../components/layout';
import { Grid } from '../components/layout/Grid';
import { Spacer } from '../components/layout/Spacer';
import Stack from '../components/layout/Stack';
import {
  Bg,
  InsetBox,
} from './';

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
              <Grid gridTemplate="auto auto / 350px 1fr" columnGap="1rem">
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
