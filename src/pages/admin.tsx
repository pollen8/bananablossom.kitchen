import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

import React from 'react';
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';

import Orders from '../components/admin/Orders';
import Layout from '../components/layout';

export default () => {

  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"

  console.log(identity)
  const isLoggedIn = identity && identity.isLoggedIn

  const isAdmin = (identity?.user?.app_metadata?.roles ?? []).contains('admin');
  return (
    <Layout>
      <button className="btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
      </button>
      {
        isLoggedIn && isAdmin &&
        <Orders />
      }
      <hr />
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />

    </Layout>
  );
}

