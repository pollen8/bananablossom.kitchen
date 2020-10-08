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
import { OpeningTimes } from '../components/OpeningTimes';

const Ul = styled.ul`

margin-left: 1.5rem;
`;

const Info = () => {
  const now = new Date();
  const data = useStaticQuery(graphql` 
query {
  portsmouthArmsMarket: file(relativePath: { eq: "portsmouth-arm-market.jpg" }) {
    childImageSharp {
          fixed(width: 270) {
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
        <Card>
          <CardBody>
            <Stack>
              <div>
                <Stack>
                  <div>
                    <Img style={{ float: 'left', marginRight: '1rem' }}
                      alt="Vietnamese market in Basingstoke"
                      fixed={data.portsmouthArmsMarket.childImageSharp.fixed} />
                  </div>
                  <div>

                    <h2>
                      Find us at our local market.
                
                  </h2>
                  <hr />
                  <h4>
                      Sat 10rd October <a href="https://www.portsmoutharmshatchwarren.co.uk/">The Portsmouth Arms</a>
                    </h4>
                    <h4>11am - 4pm</h4>
                      <p>Menu for Saturday only:</p>  
                      <h5>Deals of the day</h5>
                      <p>
                    <Ul>
                      <li>2 Chicken spring rolls and a pork bao bun £6.00</li>
                      <li>2 vegetable spring rolls and a veg bao bun £5.00</li>
                    </Ul>
                    </p>
                    <h5>
                      Crispy spring rolls
                  </h5>
                    <p>
                      <Ul>
                        <li>3 x chicken (gluten free)  £4.50</li>
                        <li>3 x vegetable (vegan) (gluten free) £3.50</li>
                      </Ul>
                    </p>


                    <h5>
                      Bao Bun
                  </h5>
                    <p>
                      <Ul>
                        <li>Steamed pork bao bun: £3.50 </li>
                        <li>Steamed vegetables bao bun (vegan) £3.00</li>
                      </Ul>
                    </p>



                    <h5>Vietnamese sandwich <br />(bánh mì)</h5>
                    <p>Homemade bread garnished with cucumber, spring onion, coriander, fresh chilli,
                   pickled carrot and its own sauce.<br /></p>
                    <p>
                      <Ul>
                        <li>Vietnamese pulled pork £7.00 </li>
                        <li>Braised duck eggs £6.00</li>
                      </Ul>
                    </p>
                  
                    
<hr />
                 
                 
                  <h2>Previous Markets</h2>
                  <h4>
                      Wed 7th October, Basingstoke Market: Top of Town 
                    </h4>
                    <h4>11am - 4pm</h4>
                    <h4>
                      Sat 3rd October
                    </h4>
                    <h4>11am - 4pm</h4>
                    <p>
                      Unfortunately due to the predicated bad weather the Portsmouth Arms market will no longer take place on the 3rd.
                  </p>
                    <p><strong>However, we are still taking pre-orders by phone on Friday for Saturday on 07904 139992 for home pickup.</strong></p>
                    <h4>Menu for Saturday only:</h4>
                    <h5>
                      Crispy spring rolls
                  </h5>
                    <p>
                      <Ul>
                        <li>3 x Chicken (Gluten free)  £4.50</li>
                        <li>3 x Vegetable (vegan) (Gluten free) £3.50</li>
                      </Ul>
                    </p>


                    <h5>
                      Bao Bun
                  </h5>
                    <p>
                      <Ul>
                        <li>Steamed Pork Bao Bun: £3.50 </li>
                        <li>Steamed Vegetables Bao Bun (Vegan) £3.00</li>
                      </Ul>
                    </p>



                    <h5>Vietnamese Sandwich <br />(Bánh mì)</h5>
                    <p>Homemade bread garnished with cucumber, spring onion, coriander, fresh chilli,
                   pickled carrot and its own sauce.<br /></p>
                    <p>
                      <Ul>
                        <li>Vietnamese pulled pork £7.00 </li>
                        <li>Braised duck eggs £6.00</li>
                      </Ul>
                    </p>
                    <hr />
                    <h4>
                      26th September, <a href="https://www.portsmoutharmshatchwarren.co.uk/">The Portsmouth Arms</a>
                    </h4>
                    <h4>11am - 4pm</h4>
                    <p>
                      After last weeks, great turn out we are back again at the <a href="https://www.portsmoutharmshatchwarren.co.uk/">The Portsmouth Arms</a>.
                 </p>
                    <p>It was fantastic to see lots of customers new and old. Please come early to avoid disappointment as we sold out very fast last week.</p>
                    <p>This week we will be serving:</p>


                    <h5>Vietnamese Sandwich <br />(Bánh mì)</h5>
                    <p>Homemade bread garnished with cucumber, spring onion, coriander, fresh chilli,
                   pickled carrot and its own sauce.<br />
                      <Ul>
                        <li>Grilled marinated pork £7.00</li>
                        <li>
                          Fried tofu with lemongrass (vegan) $6.00</li>
                      </Ul>
                    </p>
                    <h5>Crispy spring rolls</h5>
                    <p>
                      <Ul>
                        <li>3 x Chicken  £4.50</li>
                        <li>3 x Vegetable (vegan) £3.50</li>
                      </Ul>
                    </p>

                    <h5>Vermicelli salad<br />(Bún thịt nướng)</h5>
                    <p>Rice vermicelli noodles salad with mint, pickled carrots, dressed
                    in homemade 'nước chấm', topped with chive sauce and roasted peanuts.
                    <Ul>
                        <li>Grilled pork with a chicken spring roll  £8.00</li>

                        <li>Shiitake mushrooms with a vegetable spring roll
£7.50</li>


                      </Ul>
                    </p>
                  </div>
                </Stack>


              </div>
              <div>

                <Img fixed={data.rating.childImageSharp.fixed} alt="Food hygiene rating: 5" />
              </div>
            </Stack>
          </CardBody>
        </Card >
        <Card>
          <CardBody>
            <OpeningTimes />
          </CardBody>
        </Card>
      </Stack >
    </Layout >
  )
}

export default Info;
