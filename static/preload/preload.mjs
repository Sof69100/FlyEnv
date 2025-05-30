// preload.js
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('FlyEnvNodeAPI', {
  ipcSendToMain: (...args) => ipcRenderer.send('command', ...args),
  ipcReceiveFromMain: (callback) => ipcRenderer.on('command', callback)
})
