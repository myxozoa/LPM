// @flow

import React, { Component } from 'react';
import Student from './Student';
import Gauges from './Gauges';
import styles from './Content.css';

type Props = {};

export default class Content extends Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        {/* <ConfigField placeholder="https://github.com/myxozoa/LPM" /> */}
        <div className={styles.content}>
          <div className={styles.repoContainer}>
            <input
              className={styles.repo}
              type="text"
              placeholder="https://github.com/myxozoa/LPM"
            />
          </div>

          <Gauges />

          <Student />
        </div>
      </div>
    );
  }
}
