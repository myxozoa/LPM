// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ConfigField.css';

const { dialog } = require('electron').remote;

type Props = {};

export default class ConfigField extends Component<Props> {
  props: Props;

  selectFile = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory', 'promptToCreate']
    });
  };

  render() {
    const { label, placeholder, button } = this.props;
    return (
      <div className={styles.container}>
        <p className={styles.label}>{label}</p>
        <div className={styles.inputContainer}>
          <input
            id={label}
            className={styles.input}
            type="text"
            placeholder={placeholder}
          />
          {button && (
            <button onClick={this.selectFile} type="button">
              H
            </button>
          )}
        </div>
      </div>
    );
  }
}

ConfigField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  button: PropTypes.string
};

ConfigField.defaultProps = {
  label: 'Input',
  placeholder: 'C:/Users/',
  button: ''
};
