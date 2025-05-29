import { BaseManager } from './Base'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class Manager extends BaseManager {
  sslAddTrustedCert(cwd: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await execAsync(
          `security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" "PhpWebStudy-Root-CA.crt"`,
          {
            cwd
          }
        )
      } catch (e) {
        reject(e)
        return
      }
      resolve(true)
    })
  }

  sslFindCertificate(cwd: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await execAsync(`security find-certificate -c "PhpWebStudy-Root-CA"`, {
          cwd
        })
        resolve({
          stdout: res.stdout,
          stderr: res.stderr
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  dnsRefresh() {
    return new Promise(async (resolve) => {
      try {
        await execAsync(`dscacheutil -flushcache`)
      } catch (e) {}
      try {
        await execAsync(`killall -HUP mDNSResponder`)
      } catch (e) {}
      resolve(true)
    })
  }
}

export default new Manager()
