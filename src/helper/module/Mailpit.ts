import { existsSync } from 'fs'
import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  binFixed(bin: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (existsSync(bin)) {
        try {
          await execAsync(`xattr -dr "com.apple.quarantine" "${bin}"`)
        } catch (e) {}
      }
      resolve(true)
    })
  }
}

export default new Manager()
