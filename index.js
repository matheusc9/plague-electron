const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 490,
    height: 420,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    transparent: false, // false se quiser cor opaca
    roundedCorners: false, // <-- ESSENCIAL para alguns casos no Windows 11
  });

  win.loadFile('index.html');

  ipcMain.on('close-app', () => {
    win.close();
  });

  Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});