import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

import Nav from './Nav';

export default function Shell({ children }) {
  return (
    <>
      <Nav />
      <main className="shell">{children}</main>
    </>
  );
}
