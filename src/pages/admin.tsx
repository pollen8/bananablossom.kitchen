import netlifyIdentity from 'netlify-identity-widget';
import React from 'react';

import Orders from '../components/admin/Orders';
import Layout from '../components/layout';

export default () => {
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

