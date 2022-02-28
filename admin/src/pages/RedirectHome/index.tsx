import React from 'react';
import { Redirect, withRouter } from 'react-router';

const RedirectHome = withRouter(() => (
    <Redirect to={{ pathname: '/dashboard/home' }} />
  ),
);

export default RedirectHome;
