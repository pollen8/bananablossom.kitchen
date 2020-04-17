import React from 'react';

import Layout from '../components/layout';

export default () => {
  return (
    <Layout>
      <div data-netlify-identity-menu></div>
      <div data-netlify-identity-button>Login with Netlify Identity</div>
    </Layout>
  );
}

