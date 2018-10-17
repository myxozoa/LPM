/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {
  app, BrowserWindow, dialog, shell
} from 'electron';

import MenuBuilder from './menu';

const { autoUpdater } = require('electron-updater');

let mainWindow = null;
let firstRun = false;
autoUpdater.autoDownload = false;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

autoUpdater.on('error', error => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
});

autoUpdater.on('update-available', () => {
  if (process.platform === 'darwin') {
    dialog.showMessageBox(
      {
        type: 'question',
        title: 'Update Available',
        message:
          'Update Available (On MacOS for the time being updates must be downloaded manually.',
        buttons: ['Go to Download Page', 'Cancel']
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          shell.openExternal('https://github.com/myxozoa/LPM/releases');
        }
      }
    );
  } else {
    dialog.showMessageBox(
      {
        type: 'question',
        title: 'Update Available',
        message: 'Found updates, would you like to update now?',
        buttons: ['Yes', 'No']
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate();
        }
      }
    );
  }
});

autoUpdater.on('update-not-available', () => {
  if (firstRun) return;
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(
    {
      title: 'Install Updates',
      message: 'Updates downloaded, application will restart for install...'
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// export this to MenuItem click callback
function checkForUpdates(fr) {
  firstRun = fr;
  autoUpdater.checkForUpdates();
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  } else {
    checkForUpdates(true);
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 645,
    height: 800,
    title: 'PM App',
    frame: false,
    // resizable: false,
    titleBarStyle: 'hidden',
    minHeight: 200,
    minWidth: 580,
    transparent: true
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
