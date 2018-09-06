// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinkSection from './LinkSection';
import links from '../constants/links.json';

import styles from './Links.css';

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
    const { section } = this.props;

    return (
      <div className={styles.container}>
        {links[section].links.map((el: linksType) => (
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

const mapStateToProps = state => ({
  section: state.preferences.section
});

export default connect(mapStateToProps)(LinksContainer);
