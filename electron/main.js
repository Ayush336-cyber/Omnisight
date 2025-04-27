const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { spawn } = require('node:child_process')

let backendProcess

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  if (app.isPackaged) {
    // production: load built html
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'))
  } else {
    // development: Vite dev server
    win.loadURL('http://127.0.0.1:5173')
    win.webContents.openDevTools()
  }
}

function startBackend () {
  const exePath = app.isPackaged
    ? path.join(process.resourcesPath, 'backend', 'backend_server.exe') // after packaging
    : path.join(__dirname, '../dist-backend/backend_server.exe')        // dev

  backendProcess = spawn(exePath, [], { cwd: path.dirname(exePath) })

  backendProcess.stdout.on('data', d => console.log('[backend]', d.toString()))
  backendProcess.stderr.on('data', d => console.error('[backend ERR]', d.toString()))
}

app.whenReady().then(() => {
  startBackend()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill()
  if (process.platform !== 'darwin') app.quit()
})
