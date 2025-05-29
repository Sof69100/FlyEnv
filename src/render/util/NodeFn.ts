import IPC from '@/util/IPC'

// Helper function to create consistent IPC calls with proper typing
const createIPCCall = <T>(namespace: string, method: string) => {
  return (...args: any[]): Promise<T> =>
    new Promise((resolve) => {
      IPC.send(`App-Node-FN`, namespace, method, ...args).then((key: string, res: T) => {
        IPC.off(key)
        resolve(res)
      })
    })
}

export class FileWatcher {
  constructor(
    public file: string,
    callback: () => void
  ) {
    IPC.send(`App-Node-FN`, 'fs', 'watchFile', file).then((key: string, code: any) => {
      if (code === 0) {
        IPC.off(key)
      } else if (code === 200) {
        callback()
      }
    })
  }

  close(): void {
    IPC.send(`App-Node-FN`, 'fs', 'watchFileClose', this.file).then((key: string) => {
      IPC.off(key)
    })
  }
}

export class DirWatcher {
  constructor(
    public dir: string,
    callback: (file: string) => void
  ) {
    IPC.send(`App-Node-FN`, 'fs', 'watchDir', dir).then((key: string, code: any) => {
      if (code === 0) {
        IPC.off(key)
      } else if (code === 200) {
        callback(code.file)
      }
    })
  }

  close(): void {
    IPC.send(`App-Node-FN`, 'fs', 'watchDirClose', this.dir).then((key: string) => {
      IPC.off(key)
    })
  }
}

export const clipboard = {
  writeText: createIPCCall<void>('clipboard', 'writeText')
}

export const app = {
  getVersion: createIPCCall<string>('app', 'getVersion')
}

export const dialog = {
  showSaveDialog: createIPCCall<Electron.SaveDialogReturnValue>('dialog', 'showSaveDialog'),
  showOpenDialog: createIPCCall<Electron.OpenDialogReturnValue>('dialog', 'showOpenDialog')
}

export const shell = {
  showItemInFolder: createIPCCall<void>('shell', 'showItemInFolder'),
  openPath: createIPCCall<string>('shell', 'openPath'),
  openExternal: createIPCCall<void>('shell', 'openExternal')
}

export const fs = {
  chmod: createIPCCall<void>('fs', 'chmod'),
  remove: createIPCCall<void>('fs', 'remove'),
  writeBufferBase64: createIPCCall<void>('fs', 'writeBufferBase64'),
  readdir: (dir: string, full = true): Promise<string[]> =>
    createIPCCall<string[]>('fs', 'readdir')(dir, full),
  mkdirp: createIPCCall<void>('fs', 'mkdirp'),
  stat: createIPCCall<import('fs').Stats>('fs', 'stat'),
  copy: createIPCCall<void>('fs', 'copy'),
  existsSync: createIPCCall<boolean>('fs', 'existsSync'),
  readFile: createIPCCall<string>('fs', 'readFile'),
  writeFile: createIPCCall<void>('fs', 'writeFile')
}
