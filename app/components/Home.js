// @flow
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Titlebar from './Titlebar';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container}>
        <Titlebar />
        <Sidebar />
      </div>
    );
  }
}
