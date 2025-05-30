import { statSync, readdirSync, chmodSync, mkdirSync, writeFile, readFile } from 'fs'
import { existsSync, readdir, appendFile } from 'fs-extra'
import { join } from 'path'

export function getAllFile(fp: string, fullpath = true) {
  let arr: Array<string> = []
  if (!existsSync(fp)) {
    return arr
  }
  const state = statSync(fp)
  if (state.isFile()) {
    return [fp]
  }
  const files = readdirSync(fp)
  files.forEach(function (item: string) {
    const fPath = join(fp, item)
    if (existsSync(fPath)) {
      const stat = statSync(fPath)
      if (stat.isDirectory()) {
        const sub = getAllFile(fPath, fullpath)
        arr = arr.concat(sub)
      }
      if (stat.isFile()) {
        arr.push(fullpath ? fPath : item)
      }
    }
  })
  return arr
}

export const getAllFileAsync = async (
  dirPath: string,
  fullpath = true,
  basePath: Array<string> = []
): Promise<string[]> => {
  if (!existsSync(dirPath)) {
    return []
  }
  const list: Array<string> = []
  const files = await readdir(dirPath, { withFileTypes: true })
  for (const file of files) {
    const arr = [...basePath]
    arr.push(file.name)
    const childPath = join(dirPath, file.name)
    if (file.isDirectory()) {
      const sub = await getAllFileAsync(childPath, fullpath, arr)
      list.push(...sub)
    } else if (file.isFile()) {
      const name = fullpath ? childPath : arr.join('/')
      list.push(name)
    }
  }
  return list
}

export function getSubDir(fp: string, fullpath = true) {
  const arr: Array<string> = []
  if (!existsSync(fp)) {
    return arr
  }
  const stat = statSync(fp)
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    try {
      const files = readdirSync(fp)
      files.forEach(function (item: string) {
        const fPath = join(fp, item)
        if (existsSync(fPath)) {
          const stat = statSync(fPath)
          if (stat.isDirectory() && !stat.isSymbolicLink()) {
            arr.push(fullpath ? fPath : item)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  return arr
}

export function chmod(fp: string, mode: string) {
  if (statSync(fp).isFile()) {
    chmodSync(fp, mode)
    return
  }
  const files = readdirSync(fp)
  files.forEach(function (item: string) {
    const fPath = join(fp, item)
    chmodSync(fPath, mode)
    const stat = statSync(fPath)
    if (stat.isDirectory() === true) {
      chmod(fPath, mode)
    }
  })
}

export function createFolder(fp: string) {
  fp = fp.replace(/\\/g, '/')
  if (existsSync(fp)) {
    return true
  }
  const arr = fp.split('/')
  let dir = '/'
  for (const p of arr) {
    dir = join(dir, p)
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }
  }
  return existsSync(fp)
}

export function writeFileAsync(fp: string, content: string) {
  return new Promise((resolve, reject) => {
    writeFile(fp, content, (err: Error) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

export function readFileAsync(fp: string, encode = 'utf-8') {
  return new Promise<string>((resolve, reject) => {
    if (!existsSync(fp)) {
      reject(new Error(`File does not exist: ${fp}`))
    }
    readFile(fp, encode as any, (err: Error, data: string) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export async function appDebugLog(flag: string, info: string) {
  try {
    const debugFile = join(global.Server.BaseDir!, 'debug.log')
    await appendFile(debugFile, `${flag}: ${info}\n`)
  } catch {
    /* empty */
  }
}
