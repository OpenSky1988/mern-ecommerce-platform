/* global document */
/* global window */

import React from 'react';

import './style.less';

const AuthLayout: React.FC = ({ children }) => (
  <div className="login">
    {children}
  </div>
);

export default AuthLayout;
