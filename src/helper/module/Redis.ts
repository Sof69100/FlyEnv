import { existsSync } from 'fs'
import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  logFileFixed(logFile: string, user: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (existsSync(logFile)) {
        console.log(`redis logFileFixed: chown ${user} ${logFile}`)
        await execAsync(`chown ${user} ${logFile}`)
      }
      resolve(true)
    })
  }
}

export default new Manager()
