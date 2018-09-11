// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import WorkingDirectory from './WorkingDirectory';
import styles from './Preferences.css';

import { setSection, setAlwaysOnTop } from '../../actions/preferences';
import routes from '../../constants/routes.json';
import info from '../../constants/info.json';
// import prefs from '../../constants/defaults.json';

// const { remote } = require('electron');

type Props = {};

class Preferences extends Component<Props> {
  props: Props;

  selectSection = e => {
    const { setSection: set } = this.props;
    set(e.target.value);
  };

  alwaysOnTop = () => {
    const { setAlwaysOnTop: set, onTop } = this.props;
    set(!onTop);
  };

  // login = () => {
  //   let authWindow = new remote.BrowserWindow({ width: 500, height: 600, parent: remote.getCurrentWindow(), modal: true });

  //   authWindow.on('closed', () => {
  //     authWindow = null;
  //   });

  //   authWindow.loadURL(prefs.login);
  // }

  render() {
    console.log(this.state);
    const { section, onTop } = this.props;
    return (
      <div className={styles.container}>
        <Link to={routes.HOME}>{'<'}</Link>
        <h1>Preferences</h1>
        <form>
          {/* <button type="button" onClick={this.login}>Login</button> */}
          <select onChange={this.selectSection} value={section}>
            {info.sections.map((sec: string) => (
              <option key={shortid.generate()} value={sec}>
                {sec}
              </option>
            ))}
          </select>
          <WorkingDirectory />

          <label htmlFor="alwaysOnTop">
            <span>Always on top:</span>
            <input
              id="alwaysOnTop"
              name="alwaysOnTop"
              type="checkbox"
              onChange={this.alwaysOnTop}
              checked={onTop}
            />
          </label>
        </form>
      </div>
    );
  }
}

Preferences.propTypes = {
  section: PropTypes.string,
  onTop: PropTypes.bool,
  setSection: PropTypes.func,
  setAlwaysOnTop: PropTypes.func
};

Preferences.defaultProps = {
  section: 'SECTION',
  onTop: false,
  setSection: () => {},
  setAlwaysOnTop: () => {}
};

const mapStateToProps = state => ({
  section: state.preferences.section,
  onTop: state.preferences.alwaysOnTop
});

export default connect(
  mapStateToProps,
  { setSection, setAlwaysOnTop }
)(Preferences);
