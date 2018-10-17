// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Title from './Title';
import LinksContainer from './LinksContainer';
import styles from './Sidebar.css';

type Props = {
  section: string,
  profilePic: string,
  ghOauth: string,
};

class Sidebar extends Component<Props> {
  render() {
    const { section, profilePic, ghOauth } = this.props;
    return (
      <div className={styles.sidebar}>
        <Title profilePic={profilePic} loggedIn={ghOauth !== 'TOKEN'} />
        <LinksContainer section={section} />
        <p className={styles.credits}>
          by: Moises Dobarganes &amp; Ronnie Miksch
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  section: state.preferences.section,
  profilePic: state.api.profilePic,
  ghOauth: state.auth.ghOauth
});

export default connect(mapStateToProps)(Sidebar);
