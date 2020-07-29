import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Shell from '../components/Shell';

export default function Home() {
  const image = useStaticQuery(graphql`
    query ImageQuery {
      file(relativePath: { eq: "dwarf.png" }) {
        publicURL
        relativePath
      }
    }
  `);

  return (
    <Shell>
      <div className="container">
        <img
          className="dwarf"
          src={image?.file?.publicURL}
          alt={image?.file?.relativePath}
        />

        <h1>Jamming with Gatsby and Sanity</h1>
        <p>HOLA</p>
      </div>
    </Shell>
  );
}
