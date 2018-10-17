// @flow

import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Links.css';

const { shell, clipboard, remote } = require('electron');

const { Menu, MenuItem } = remote;

// Link.propTypes = {
//   label: PropTypes.string,
//   url: PropTypes.string
// };

// Link.defaultProps = {
//   label: 'Airtable',
//   url: '#'
// };

type Props = {
  url: string,
  label: string,
};

export default class Link extends Component<Props> {
  props: Props;

  open = (): void => {
    const { url } = this.props;
    shell.openExternal(url);
  };

  copy = (): void => {
    const { url } = this.props;
    clipboard.writeText(url, 'selection');
  };

  copyMenu = (e: SyntheticEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const window = remote.getCurrentWindow();
    const contextMenu = new Menu();
    const item = new MenuItem({
      label: 'Copy',
      click: () => {
        this.copy();
      }
    });
    contextMenu.append(item);
    contextMenu.popup({ window });
  };

  render() {
    const { label } = this.props;
    return (
      <a
        className={styles.link}
        onClick={this.open}
        onContextMenu={this.copyMenu}
        // onKeyDown={this.handleKey}
        role="button"
        tabIndex="0"
      >
        <span>{label}</span>
      </a>
    );
  }
}
