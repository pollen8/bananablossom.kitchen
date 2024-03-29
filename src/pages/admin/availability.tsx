import React from 'react';
import { useIdentityContext } from 'react-netlify-identity-widget';

import Availability from '../../components/admin/Availability';
import AdminLayout from '../../components/AdminLayout';

export default () => {

  const identity = useIdentityContext()

  const isLoggedIn = identity && identity.isLoggedIn

  const isAdmin = (identity?.user?.app_metadata?.roles ?? []).includes('admin');
  return (
    <AdminLayout>
      {
        isLoggedIn && isAdmin &&
        <Availability />
      }
    </AdminLayout>
  );
}

