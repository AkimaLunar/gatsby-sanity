import React from 'react';
import '../styles/main.css';
import '../styles/layout.css';

import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="nes-btn" to="/">
        Home
      </Link>
      <Link className="nes-btn" to="/about-me">
        About Me
      </Link>
    </nav>
  );
}
