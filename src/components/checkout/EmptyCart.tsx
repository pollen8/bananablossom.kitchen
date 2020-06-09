import { Link } from 'gatsby';
import React from 'react';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import Layout from '../layout';

const EmptyCart = () => {
  return (
    <Layout>
      <Card>
        <CardBody>
          <h1>Nothing to buy</h1>
          <Link to="meals">
            <Button>Order some
            </Button>
          </Link>
        </CardBody>
      </Card>
    </Layout>
  )
}

export default EmptyCart;
