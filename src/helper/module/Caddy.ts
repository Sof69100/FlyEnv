import { existsSync } from 'fs'
import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  sslDirFixed(sslDir: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (existsSync(sslDir)) {
        try {
          const res = await execAsync(['ls', '-al', sslDir].join(' '))
          if (res.stdout.includes(' root ')) {
            await execAsync(['rm', '-rf', sslDir].join(' '))
          }
        } catch (e) {}
      }
      resolve(true)
    })
  }
}

export default new Manager()
