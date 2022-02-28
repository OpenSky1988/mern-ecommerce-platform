import React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

const RedirectToLoginScreen = withRouter(({ location }: RouteComponentProps) => (
    <Redirect to={{
      pathname: '/login',
      search: `?redirect=${location.pathname}`,
    }} />
  ),
);

export default RedirectToLoginScreen;
