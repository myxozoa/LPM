// @flow

import React from 'react';

import info from '../../constants/info.json';

import LinkSection from './LinkSection';
import styles from './LinksContainer.css';

const shortid = require('shortid');

// type Props = {
//   section: string,
// };

type subLinksType = {
  label: string,
  url: string
};

type linksType = {
  title: string,
  links: Array<subLinksType>
};

export default function LinksContainer(/* props: Props */) {
  return (
    <div className={styles.container}>
      {info.links.map((el: linksType) => (
        <LinkSection key={shortid.generate()} {...el} />
      ))}
    </div>
  );
}
