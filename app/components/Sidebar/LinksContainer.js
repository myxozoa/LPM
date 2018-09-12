// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import info from '../../constants/info.json';

import LinkSection from './LinkSection';
import styles from './LinksContainer.css';

const shortid = require('shortid');

type Props = {};

type subLinksType = {
  label: string,
  url: string
};

type linksType = {
  title: string,
  links: Array<subLinksType>
};

class LinksContainer extends Component<Props> {
  props: Props;

  render() {
    // const { section } = this.props;
    return (
      <div className={styles.container}>
        {info.links.map((el: linksType) => (
          <LinkSection key={shortid.generate()} {...el} />
        ))}
      </div>
    );
  }
}

LinksContainer.propTypes = {
  section: PropTypes.string
};

LinksContainer.defaultProps = {
  section: 'defaul tprop'
};

export default LinksContainer;
