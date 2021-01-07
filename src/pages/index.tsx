import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';
import { FlexRow } from '../components/MealListItemDetails';

const Ul = styled.ul`
margin-top: 0.75rem;
margin-left: 1.5rem;
margin-bottom: 0.75rem;
`;

const Info = () => {
  const now = new Date();
  const data = useStaticQuery(graphql` 
query {
  sign: file(relativePath: { eq: "sign.png" }) {
    childImageSharp {
          fixed(width: 570) {
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
          fixed(width: 200) {
          ...GatsbyImageSharpFixed
        } 
        }
  }
}
`)

  return (
    <Layout>
      <Stack>
        <CardBody style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Img
              fixed={data.sign.childImageSharp.fixed} alt="Authentic Vietnamese Cuisine in Basingstoke" />
          </div>

          <Card style={{ marginTop: '2rem', marginBottom: '3rem', textAlign: 'left', maxWidth: '60rem', margin: 'auto', backgroundColor: 'rgb(253, 237, 240)' }}>
            <CardBody>
              <h1>Special Bún bò Huế night, Thursday 7th January</h1>
              <hr />
              <FlexRow>
                <div>
                  <div style={{ fontSize: '1.0rem' }}> <p>It's a beef noodle soup originating from the Huế region, a central province of Vietnam.</p>
                    <p>This noodle soup is beefy, spicy &amp; has a robust broth.
                If you love Pho and you love a bit of spice then definitely give Bun Bo Hue a try.</p> </div>
                  <p>(Gluten free)</p>
                </div>
                <div style={{ marginLeft: '2rem' }}>
                  <div style={{ fontSize: '1.1rem' }}>&pound;10.00</div>
                  Only
                </div>
              </FlexRow>
              <p>Our kitchen will be opened for <strong>collection</strong> and <strong>delivery</strong>
              &nbsp; on the 7th of January from 5:30pm to 8pm. <br />
              Free delivery is available with orders starting from 3 portions. Please contact us to make sure
              that you are in free delivery zone.</p>
              <p>Pre-order is essential by 11pm Tuesday 5th of January via <a href="https://www.facebook.com/bananablossom.kitchen">Messenger on our Facebook page</a>.
              The payment link will be sent when you place your order.</p>

              <a style={{ fontWeight: 'bold' }} href="https://www.facebook.com/bananablossom.kitchen">Order now, via Messenger on our Facebook page</a>
            </CardBody>
          </Card>

          <h1 style={{ marginTop: '1rem' }}>
            Find us at our local Hampshire markets.
          </h1>
          <p>Sample our freshly made home cooked Vietnamese cuisine.</p>
          <Stack style={{ maxWidth: '60rem', margin: 'auto' }}>


            <div>
              <Stack>

                <div>
                  <a href="https://www.portsmoutharmshatchwarren.co.uk/">
                    <Img style={{ clipPath: 'circle(100px at center)' }}
                      alt="Vietnamese market in Basingstoke"
                      fixed={data.baobun.childImageSharp.fixed} />
                  </a>
                  <h3>The Portsmouth Arms</h3>
                  <p>Hatch Warren, every Saturday 11am - 4pm</p>
                </div>
                {/* <div>
                  <Img style={{ clipPath: 'circle(100px at center)' }}
                    alt="Vietnamese market in Basingstoke"
                    fixed={data.springroll.childImageSharp.fixed} />
                  <h3>Basingstoke Top of Town</h3>
                  <p>Every Wednesday 11am - 4pm</p>
                </div> */}
              </Stack>
              <Img fixed={data.hr.childImageSharp.fixed} />
              <h4 style={{ marginTop: '2rem' }}>Example menu</h4>
              <Ul>
                <li>2 Chicken spring rolls and a pork bao bun £6.00</li>
                <li>2 vegetable spring rolls and a veg bao bun £5.00</li>
              </Ul>

              <h5>
                Crispy spring rolls
                  </h5>

              <Ul>
                <li>3 x chicken (gluten free)  £4.50</li>
                <li>3 x vegetable (vegan) (gluten free) £3.50</li>
              </Ul>
              <h5>
                Bao Bun
                  </h5>
              <Ul>
                <li>Steamed pork bao bun: £3.50 </li>
                <li>Steamed vegetables bao bun (vegan) £3.00</li>
              </Ul>
              <h5>Vietnamese sandwich (bánh mì)</h5>
              <p>Homemade bread garnished with cucumber, spring onion, coriander, fresh chilli,
                   pickled carrot and its own sauce.<br /></p>

              <Ul>
                <li>Vietnamese pulled pork £7.00 </li>
                <li>Braised duck eggs £6.00</li>
              </Ul>

            </div>
          </Stack>
          <div>
            <Img fixed={data.hr.childImageSharp.fixed} />
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Img fixed={data.rating.childImageSharp.fixed} alt="Food hygiene rating: 5" />
          </div>
        </CardBody>
      </Stack>
    </Layout>
  )
}

export default Info;
