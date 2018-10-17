import React, { Component } from 'react';

import { history } from '../store/configureStore';

import styles from './Titlebar.css';

const { remote, shell } = require('electron');

const { Menu } = remote;

type Props = {
  mac: boolean,
};

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
            label: '&Preferences',
            click: () => {
              history.push('/preferences');
            }
          },
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
    const { mac } = this.props;
    return (
      <div className={styles.titlebar}>
        {!mac && (
          <React.Fragment>
            <div
              className={styles.menu}
              onClick={this.menu}
              onKeyPress={this.handleKeyPress}
              role="button"
              tabIndex="0"
            >
              <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 15.032 11.484"
                width="15px"
                height="15px"
              >
                <g
                  id="Group_29"
                  data-name="Group 29"
                  style={{ fill: 'none', stroke: '#FFFFFF' }}
                  transform="translate(-10.5 -9)"
                >
                  <line
                    id="Line_9"
                    data-name="Line 9"
                    className="cls-1"
                    x2="15.032"
                    transform="translate(10.5 9.5)"
                  />
                  <line
                    id="Line_10"
                    data-name="Line 10"
                    className="cls-1"
                    x2="15.032"
                    transform="translate(10.5 14.742)"
                  />
                  <line
                    id="Line_11"
                    data-name="Line 11"
                    className="cls-1"
                    x2="15.032"
                    transform="translate(10.5 19.984)"
                  />
                </g>
              </svg>
            </div>
            <div className={styles.controls}>
              <div
                onClick={this.minimize}
                onKeyPress={this.handleKeyPress}
                role="button"
                tabIndex="0"
              >
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  viewBox="0 0 14.151 1"
                  width="15px"
                  height="4px"
                >
                  <path
                    id="Minimize_Button"
                    data-name="Minimize Button"
                    style={{ fill: 'none', stroke: '#dbdbdb' }}
                    className="cls-1"
                    d="M0,0H14"
                    transform="translate(0 0.5)"
                  />
                </svg>
              </div>
              <div
                onClick={this.close}
                onKeyPress={this.handleKeyPress}
                role="button"
                tabIndex="0"
              >
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  viewBox="0 0 11.707 11.707"
                  width="13px"
                  height="13px"
                >
                  <g
                    id="Close_Button"
                    data-name="Close Button"
                    style={{ fill: 'none', stroke: '#dbdbdb' }}
                    transform="translate(-658.146 -6.146)"
                  >
                    <line
                      id="Line_7"
                      data-name="Line 7"
                      className="cls-1"
                      x2="11"
                      y2="11"
                      transform="translate(658.5 6.5)"
                    />
                    <line
                      id="Line_8"
                      data-name="Line 8"
                      className="cls-1"
                      y1="11"
                      x2="11"
                      transform="translate(658.5 6.5)"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
