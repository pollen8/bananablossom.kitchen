import 'react-netlify-identity-widget/styles.css'; // delete if you want to bring your own CSS

import React from 'react';
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget';

import Admin from '../components/admin/Admin';
import AdminLayout from '../components/AdminLayout';
import Button from '../components/Button';

export default () => {

  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name = identity?.user?.user_metadata?.full_name ?? '';

  const isLoggedIn = identity && identity.isLoggedIn

  const isAdmin = (identity?.user?.app_metadata?.roles ?? []).includes('admin');
  return (
    <AdminLayout>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
        </Button>
      </div>
      {
        isLoggedIn && isAdmin &&

        <Admin />
      }
      <hr />
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />

    </AdminLayout>
  );
}

