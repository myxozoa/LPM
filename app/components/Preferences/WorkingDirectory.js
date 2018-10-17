// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setWorkingDirectory } from '../../actions/preferences';

import styles from './WorkingDirectory.css';

const { dialog } = require('electron').remote;

type Props = {
  setWorkingDirectory: Function,
  value: string,
};

class WorkingDirectory extends Component<Props> {
  selectFile = (): void => {
    const { setWorkingDirectory: setWorkingDirectoryAction } = this.props;
    dialog.showOpenDialog(
      {
        properties: ['openDirectory', 'createDirectory', 'promptToCreate']
      },
      path => {
        setWorkingDirectoryAction(path[0]);
      }
    );
  };

  render() {
    const {
      value,
      setWorkingDirectory: setWorkingDirectoryAction
    } = this.props;
    return (
      <div className={styles.container}>
        <p className={styles.label}>Working Directory:</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="directory"
            value={value}
            onChange={e => setWorkingDirectoryAction(e.target.value)}
          />
          <button onClick={this.selectFile} type="button">
            Open
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.preferences.workingDirectory
});

export default connect(
  mapStateToProps,
  { setWorkingDirectory }
)(WorkingDirectory);
