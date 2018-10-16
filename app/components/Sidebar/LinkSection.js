// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Link from './Link';
import styles from './LinkSection.css';

const shortid = require('shortid');

// LinkSection.propTypes = {
//   title: PropTypes.string,
//   links: PropTypes.arrayOf(PropTypes.object)
// };

// LinkSection.defaultProps = {
//   title: '',
//   links: [{}]
// };

type linkType = {
  label: string,
  url: string,
};

type Props = {
  title: string,
  links: Array<linkType>,
};


export default class LinkSection extends Component<Props> {
  render() {
    const { title, links } = this.props;
    return (
      <div className={styles.container}>
        <h2 className={styles.section}>{title}</h2>
        {links.map((el: linkType) => (
          <Link key={shortid.generate()} {...el} />
        ))}
      </div>
    );
  }
}
