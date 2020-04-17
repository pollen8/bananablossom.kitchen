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
  kitchen: file(relativePath: { eq: "linh-in-kitchen.jpg" }) {
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

                <h2>
                  Banana Blossom offers authentic home cooked vietnamese food, one of the healthiest cuisines in the world.
                </h2>
                <h6>
                  Order our food and make your lunchtime a memorable experience!
                </h6>
                <h3><Img style={{ float: 'left', marginRight: '1rem' }} fixed={data.kitchen.childImageSharp.fixed} alt="Linh Clayburn in the kitchen" />Meet Linh</h3>
                <p>
                  Linh was born in Vietnam, where her family has run a successful street food restaurant in
                  Ho Chi Minh City for over 20 years.
                  They source all their food from local markets and enjoy experiencing the
                  pleasure their cooking gives their customers.
                  As with many Vietnamese street vendors they specialise in a particular dish.
                  In this case this is Cơm tấm - grilled pork, shredded pork, pork skin,
                  fried egg, pork meatloaf, pickled carrot, and sliced cucumber.
                </p>
                <p>At the age of 18 Linh moved to La Rochelle, France.
                After having completed her initial studies in French, Linh worked
                for <a href="http://planetesesame.com/">Planète Sésame</a>,
                  a charity whose aim is to aid female immigrants to get their first job in a kitchen. This experience gave
                  Linh a veritable introduction into world cuisine, especially those originating from North Africa.
</p>
                <p>Then in 2012 she attended <a href="https://www.apprentissage.cma17.fr/">CFA De Lagord</a> where she obtained a
                    Baccalauréat Professionnel in cuisine, whilst working
                    as the second chef at <a href="https://le-bistrot-dla-chaine.business.site/">La Bistro de La Chaine</a>.
                </p>
                <p>Linh has been living and working in England for the last 4 years, where she was a chef de partie at
                  the <a href="www.whitehartoverton.co.uk">White Hart Overton</a> and
                  at the<a href="https://www.fourseasons.com/hampshire"> Four Seasons Hotel</a> where she was responsible for
                  creating their Café Santé asian fusion menus.</p>

                <p>In 2020 Linh decided to start Banana Blossom with the aim of providing high quality authentic
                Vietnamese cuisine, encapsulating and transcribing her family's wealth of culinary knowledge for your
                tasting pleasure.
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
                <td>Closed</td>
              </tr>
            </table>
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  )
}

export default Info;
