import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  macportsDirFixed(enDir: string, shareDir: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        await execAsync(`mkdir -p ${enDir}`)
        await execAsync(`cp -R ${shareDir} ${enDir}`)
      } catch (e) {}
      resolve(true)
    })
  }
}

export default new Manager()
