/* global document */
/* global window */

import React from 'react';

import Deal from '../../components/Deal';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import './style.less';

const MainLayout: React.FC = ({ children }) => (
  <div className="main">
    <Deal />
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
