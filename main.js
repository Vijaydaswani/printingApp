const { app, BrowserWindow } = require('electron');
const path = require('path');
const server = require('./print-agent');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Load index.html for debugging purposes
    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

// Start the local server to handle print requests
server.start();

// Electron initialization
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
