const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        minWidth:920,
        minHeight:950,
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
});