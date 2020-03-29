import {
  graphql,
  useStaticQuery,
} from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';

const Info = () => {
  const now = new Date();
  const data = useStaticQuery(graphql` 
query {
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
            <h1>About us</h1>
            <Stack>
              <div>

                <p>
                  Banana Blossom offers an authentic homecooked vietnamese food, one of the healthiest cuisine worldwide.
            </p>
                <p>
                  Order our food and make your lunchtime a memorable experience!
          </p>
              </div>
              <div>

                <Img fixed={data.rating.childImageSharp.fixed} alt="Food hygiene rating: 5" />
              </div>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h1>Opening Times</h1>
            <table>
              <tr>
                <th>Monday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Tuesday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Wednesday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Thursday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Friday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Saturday</th>
                <td>10:00 - 20:00</td>
              </tr>
              <tr>
                <th>Sunday</th>
                <td>11:00 - 20:00</td>
              </tr>
            </table>
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  )
}

export default Info;
