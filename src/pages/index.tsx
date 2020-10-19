import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import CardBody from '../components/CardBody';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';

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
                <div>
                  <Img style={{ clipPath: 'circle(100px at center)' }}
                    alt="Vietnamese market in Basingstoke"
                    fixed={data.springroll.childImageSharp.fixed} />
                  <h3>Basingstoke Top of Town</h3>
                  <p>Every Wednesday 11am - 4pm</p>
                </div>
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



            {/* <div>

                  </div> */}
          </Stack>
          <div>
            <Img fixed={data.hr.childImageSharp.fixed} />
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Img fixed={data.rating.childImageSharp.fixed} alt="Food hygiene rating: 5" />
          </div>
        </CardBody>
        {/* </Card > */}
        {/* <Card>
          <CardBody>
            <OpeningTimes />
          </CardBody>
        </Card> */}
      </Stack >
    </Layout >
  )
}

export default Info;
