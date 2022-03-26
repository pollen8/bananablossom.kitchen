import {
  graphql,
  Link,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import { useNavigate } from '@reach/router';

import Button from '../components/Button';
import CardBody from '../components/CardBody';
import EventsList from '../components/EventsList';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';
import { FlexRow } from '../components/MealListItemDetails';
import hrblue from '../images/hr-blue.png';
// import banner from './banner.jpg';
import banner from './banner2.jpg';

const Ul = styled.ul`
  margin-top: 0.75rem;
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
`;

export const Grid = styled.div<{ columnCount?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-template-rows: auto;
  grid-column-gap: 0rem;
  margin: 0;
  grid-row-gap: 1rem;
`;

export const Bg = styled.div`
  width: 100%;
  height: 100%;
  background-image:url(${banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 5rem 0;

  @media (max-width: 640px){ 
    padding: 1rem 0;
  }
`;

export const InsetBox = styled.div`
  background: hsla(215, 38%, 96%, 90%);
  max-width: 60rem;
  padding: 2rem;
  margin: 1rem auto;

  position: relative;
  overflow: hidden;

  h2 {

    line-height: 2rem;
    color:  hsl(215, 38%, 26%);
  }

  h3, h1 {
    color:  hsl(215, 38%, 26%);
  }
  > * {
    text-align: left;
  }

  a {
    color:  hsl(215, 38%, 26%);
    text-decoration-style: dotted;
  }
  
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: -20%;
    right: -70%;
    z-index: 1;
    background: transparent no-repeat url(${hrblue});
    background-size: 40%;
    transform: rotate(-30deg);
  }
`;

const H1 = styled.h1`
font-size: 3rem;
`;

const InsetGrid = styled.div`
display: grid;
grid-template-columns: 25rem 1fr;
column-gap: 2rem;
@media (max-width: 640px){ 
  grid-template-columns:  1fr;

  h1 {
    font-size: 2rem;
  }

  div {
    text-align: center;
  }
}

`;

const Info = () => {
  const navigate = useNavigate();
  const now = new Date();
  const data = useStaticQuery(graphql` 
query {
  sign: file(relativePath: { eq: "sign.png" }) {
    childImageSharp {
          fixed(width: 470) {
          ...GatsbyImageSharpFixed
        } 
        }
  }
  portsmouthArmsMarket: file(relativePath: { eq: "portsmouth-arm-market.jpg" }) {
    childImageSharp {
          fixed(width: 200) {
          ...GatsbyImageSharpFixed
        } 
        }
  }

  springroll: file(relativePath: { eq: "spring-rolls-ready-to-eat.jpg" }) {
    childImageSharp {
          fixed(width: 350) {
          ...GatsbyImageSharpFixed
        } 
        }
  }
  baobun: file(relativePath: { eq: "banh-bao-veg.jpg" }) {
    childImageSharp {
          fixed(width: 350) {
          ...GatsbyImageSharpFixed
        } 
        }
  }


  hr: file(relativePath: { eq: "hr.png" }) {
    childImageSharp {
          fixed(width: 200) {
          ...GatsbyImageSharpFixed
        } 
        }
  }

  rating: file(relativePath: { eq: "fhrs_5_en-gb.jpg" }) {
    childImageSharp {
          fixed(width: 100) {
          ...GatsbyImageSharpFixed
        } 
        }
  }
  
  hrblue: file(relativePath: { eq: "hr-blue.png" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
  food1: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-1.jpg" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    food17: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-17.jpg" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    food32: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-32.jpg" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    food34: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-34-t.png" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    food21: file(relativePath: { eq: "food/Linh Food Website ratio (3.60 x3.00)-21.png" }) {
    childImageSharp {fixed(width: 350) {...GatsbyImageSharpFixed}  }}
    banner:  file(relativePath: { eq: "banner/Linh Food Website ratio (3.60 x3.00)-39.jpg" }) {
    childImageSharp {fixed(width: 1080) {...GatsbyImageSharpFixed}  }}
 
    
}
`)

  return (
    <Layout>
      <Stack>
        <CardBody style={{ textAlign: 'center', padding: 0, margin: 0 }}>
          <Bg>

            <InsetBox>
              <InsetGrid>
                <div>
                  <a href="https://www.portsmoutharmshatchwarren.co.uk/">
                    <Img fixed={data.food21.childImageSharp.fixed} alt="Vietnamese market in Basingstoke" />
                  </a>
                </div>
                <div>
                  <H1>Authentic Vietnamese Home Cooking</H1>
                  <h2>
                    Find us at our local Hampshire market
                  </h2>

                  <h3>
                    <a href="https://www.portsmoutharmshatchwarren.co.uk/">
                      The Portsmouth Arms Market
                    </a>
                  </h3>
                  <p>Hatch Warren, the first Saturday of every month10am - 2pm</p>
                </div>
              </InsetGrid>
            </InsetBox>

            <InsetBox>
              <InsetGrid>
                <div>
                  <h2><Link to="/thursday-take-away">Thursdays are take-away days</Link></h2>

                  <Link to="/thursday-take-away">
                    <Img fixed={data.food34.childImageSharp.fixed} alt="Vietnamese market in Basingstoke" />
                  </Link>

                  <p>Discover our rotating menu of authentic Vietnamese food, freshly prepared every Thursday.</p>
                  <p>The last Thursday of every month with be our special Phở night.</p>
                  <p>Our kitchen will be opened for collection on Thursdays from 5pm to 7:30pm.</p>
                  <p>Orders accepted up until 12pm on Wednesday.</p>
                  <Button onClick={() => navigate("/fthursday-take-away")}>Order now</Button>
                </div>

                <div>
                  <h2>Upcoming Events</h2>
                  <EventsList />
                </div>
              </InsetGrid>
            </InsetBox>
          </Bg>

        </CardBody>
      </Stack>
    </Layout>
  )
}

export default Info;
