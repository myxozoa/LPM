const electron = require('electron');
const url = require('url');
const path = require('path');

// Extract a few tools out of Electron
const { app, BrowserWindow, Menu, ipcMain } = electron;

// Declare windows, prepare for Garbage Collection
let main;

// Listen for app to be ready
app.on('ready', () => {
    // create new window
    main = new BrowserWindow({ width: 500, height: 600 });
    // Load HTML into window
    main.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    main.on('closed', () => {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu)
});

// The "File" Menu
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click() {
                    app.quit();
                },
                // Ternary operator for shortcut on Mac or PC for Quit Program
                // Works for Both PC and Mac based on that Conditional Statement
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q'
            },
        ]
    }, {
        label: "Edit",
        submenu: [
            // Edit menu for enabling MAC functionality of Copy / Paste / Undo / Etc.
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }

];

// Add developer tools item if not in production mode
// Ctrl Shift I will toggle them
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Toggle',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
                accelerator: process.platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
            },
            {
                role: 'reload',
            }
        ]

    });
}