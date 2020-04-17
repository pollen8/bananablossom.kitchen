import netlifyIdentity from 'netlify-identity-widget';
import React from 'react';

import Orders from '../components/admin/Orders';
import Layout from '../components/layout';

export default () => {
  console.log(netlifyIdentity, netlifyIdentity.currentUser());
  return (
    <Layout>
      {
        netlifyIdentity.store?.user?.id === undefined &&
        <div data-netlify-identity-button>Login with Netlify Identity</div>
      }
      {
        netlifyIdentity.store?.user?.id !== undefined &&
        <Orders />
      }
      <hr />
      <div data-netlify-identity-menu></div>

    </Layout>
  );
}

