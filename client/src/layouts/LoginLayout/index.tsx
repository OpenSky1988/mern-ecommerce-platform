/* global document */
/* global window */

import React from 'react';

import './style.less';

const LoginLayout: React.FC = ({ children }) => (
  <div className="login">
    <div className="login__container">
      {children}
    </div>
  </div>
);

export default LoginLayout;
