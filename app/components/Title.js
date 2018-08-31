// @flow

import React, { Component } from 'react';
import styles from './Title.css';

type Props = {};

export default class Title extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.title}>
        <h1>PM App</h1>
        <svg viewBox="0 0 120 120" height="62" width="62">
          <circle cx="50%" cy="50%" r="47" className={styles.logo} />
        </svg>
      </div>
    );
  }
}
