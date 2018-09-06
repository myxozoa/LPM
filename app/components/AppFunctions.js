// @flow
import React, { Component } from 'react';
import styles from './AppFunctions.css';

type Props = {};

export default class AppFunctions extends Component<Props> {
  props: Props;

  render() {
    return (
      <React.Fragment>
        <button type="button" className={styles.button}>
          Batch
        </button>
        <button type="button" className={styles.button}>
          Save
        </button>
      </React.Fragment>
    );
  }
}
