// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Title.css';

type Props = {};

export default class Title extends Component<Props> {
  props: Props;

  render() {
    const { profilePic } = this.props;

    return (
      <div className={styles.title}>
        <h1>PM App</h1>
        <img src={profilePic} alt="pic" />
      </div>
    );
  }
}

Title.propTypes = {
  profilePic: PropTypes.string
};

Title.defaultProps = {
  profilePic: 'URL'
};
