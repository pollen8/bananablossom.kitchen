import { Link } from 'gatsby';
import React from 'react';

import CardBody from '../components/CardBody';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';
import {
  Bg,
  InsetBox,
} from './';

const Catering = () => {

  return (
    <Layout>
      <Bg>
        <InsetBox>
          <Stack>
            <div>

              <h2>
                Catering
              </h2>
              <p>We can provide catering for up to 30 people. </p>
              <h3>Private events</h3>
              <p>

                <Link to="/contact">Contact us for a quote</Link>
              </p>
              <h3>Corporate</h3>
              <p>

              </p>
            </div>

          </Stack>
        </InsetBox>
      </Bg>
    </Layout>

  )
}

export default Catering;
