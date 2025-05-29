import IPC from '@/util/IPC'

export const app = {
  getVersion: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'app', 'getVersion', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  }
}

export const dialog = {
  showOpenDialog: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'dialog', 'showOpenDialog', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  }
}

export const shell = {
  openPath: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'shell', 'openPath', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  },
  openExternal: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'shell', 'openExternal', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  }
}

export const fs = {
  existsSync: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'fs', 'existsSync', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  },
  readFile: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'fs', 'readFile', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  },
  writeFile: (...args: any) => {
    return new Promise((resolve) => {
      IPC.send(`App-Node-FN`, 'fs', 'writeFile', ...args).then((key: string, res: any) => {
        IPC.off(key)
        resolve(res)
      })
    })
  }
}
