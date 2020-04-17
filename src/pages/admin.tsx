import React from 'react';

import Orders from '../components/admin/Orders';
import Layout from '../components/layout';

const netlifyIdentity = require('netlify-identity-widget');
export default () => {
  console.log(window, netlifyIdentity.currentUser());
  return (
    <Layout>
      {
        netlifyIdentity.currentUser() === null &&
        <div data-netlify-identity-button>Login with Netlify Identity</div>
      }
      {
        netlifyIdentity.currentUser() !== null &&
        <Orders />
      }
      <div data-netlify-identity-menu></div>

    </Layout>
  );
}

