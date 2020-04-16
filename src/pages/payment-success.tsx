
import React from 'react';

import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Layout from '../components/layout';

export default () => {
  const info = typeof window !== 'undefined' && sessionStorage.getItem('form-order')
    ? JSON.parse(sessionStorage.getItem('form-order'))
    : { name: '', email: '' };

  return (
    <Layout>
      <Card>
        <CardBody>

          <h1>{info.name}, thanks for your order</h1>
          <p>If you have any questions regarding your order please contact us.</p>
          <p>We've sent a receipt sent to {info.email} confirming the order.</p>
          <ul>
            <li>tel: 07904 139992</li>
            <li>email: <a href="mailto:bananablossom.kitchen@gmail.com">bananablossom.kitchen@gmail.com</a></li>
          </ul>
        </CardBody>
      </Card>
    </Layout>
  );
};
