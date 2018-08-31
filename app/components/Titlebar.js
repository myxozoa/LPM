import React, { Component } from 'react';
import styles from './Titlebar.css';

const { remote, shell } = require('electron');

const { Menu } = remote;

type Props = {};

export default class Titlebar extends Component<Props> {
  props: Props;

  minimize = () => {
    remote.getCurrentWindow().minimize();
  };

  close = () => {
    remote.getCurrentWindow().close();
  };

  menu = () => {
    const window = remote.getCurrentWindow();
    // TODO: Clean this up a lot
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Quit',
            accelerator: 'Ctrl+W',
            click: () => {
              window.close();
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
          { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: () => {
              window.webContents.reload();
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: () => {
              window.toggleDevTools();
            }
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Documentation',
            click() {
              shell.openExternal('https://github.com/myxozoa/LPM');
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/myxozoa/LPM/issues');
            }
          }
        ]
      }
    ];
    const newMenu = Menu.buildFromTemplate(templateDefault);
    newMenu.popup(window);
  };

  render() {
    return (
      <div className={styles.titlebar}>
        <div
          className={styles.menu}
          onClick={this.menu}
          onKeyPress={this.handleKeyPress}
          role="button"
          tabIndex="0"
        >
          <i className="fas fa-bars" />
        </div>
        <div className={styles.controls}>
          <div
            onClick={this.minimize}
            onKeyPress={this.handleKeyPress}
            role="button"
            tabIndex="0"
          >
            <i className="far fa-window-minimize" />
          </div>
          <div
            onClick={this.close}
            onKeyPress={this.handleKeyPress}
            role="button"
            tabIndex="0"
          >
            <i className="fas fa-times" />
          </div>
        </div>
      </div>
    );
  }
}
