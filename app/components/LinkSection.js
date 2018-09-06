// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

import styles from './Links.css';

const shortid = require('shortid');

type Props = {};

type linkType = {
  label: string
};

export default class LinkSection extends Component<Props> {
  props: Props;

  render() {
    const { title, links } = this.props;
    return (
      <React.Fragment>
        <h2 className={styles.section}>{title}</h2>
        {links.map((el: linkType) => (
          <Link key={shortid.generate()} {...el} />
        ))}
      </React.Fragment>
    );
  }
}
LinkSection.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object)
};

LinkSection.defaultProps = {
  title: '',
  links: [{}]
};
