import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  initPlugin(cwd: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await execAsync(`./rabbitmq-plugins enable rabbitmq_management`, {
          cwd
        })
      } catch (e) {
        reject(e)
        return
      }
      resolve(true)
    })
  }
}

export default new Manager()
