// @flow
import React, { Component } from 'react';
import Title from './Title';
// import AppFunctions from './AppFunctions';
import LinksContainer from './LinksContainer';
import styles from './Sidebar.css';

type Props = {};

export default class Sidebar extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.sidebar}>
        <Title />
        {/* <AppFunctions /> */}
        <LinksContainer />
        <p className={styles.credits}>
          by: Moises Dobarganes &amp; Ronnie Miksch
        </p>
      </div>
    );
  }
}
