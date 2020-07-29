import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Shell from '../components/Shell';

export default function AboutMe({ data }) {
  const { bio, avatar } = data?.sanityInfo;
  return (
    <Shell>
      <div className="container about-me">
        <img className="avatar" src={avatar?.asset?.url} alt={avatar.alt} />
        <BlockContent blocks={bio} />
      </div>
    </Shell>
  );
}

export const query = graphql`
  query AboutMeQuery {
    sanityInfo(_id: { eq: "info" }) {
      bio {
        _key
        _type
        style
        list
        _rawChildren
        children {
          _key
          _type
          text
        }
      }
      avatar {
        alt
        asset {
          url
        }
      }
    }
  }
`;
