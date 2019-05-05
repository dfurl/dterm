import {DTERM_HOME, DTERM_VERSION, ENV_STORAGE_KEY} from '../modules/dterm-constants.js'
import {selectHome, saveHome, buildEnv} from '../modules/dterm-home.js'
import joinPath from '../modules/join-path.js'
import publicState from '../modules/dterm-public-state.js'

export default async function (opts = {}) {
  if (opts.version || opts.v) {
    return DTERM_VERSION
  }
  if (opts.home) {
    await selectHome(opts.home)
  } else if (opts.reload) {
    await selectHome(publicState.home.archive.url)
  }
  if (opts.pin === true || opts.p === true) {
    localStorage.setItem(DTERM_HOME, publicState.home.archive.url)
  } else if (opts.pin === false) {
    return localStorage.removeItem(DTERM_HOME)
  }
  return publicState.home.archive.url
}

export async function config (opts = {}) {
  let env = await readEnv()
  let set = (opt, fn) => {
    let val = opts[opt]
    if (typeof val !== 'undefined') {
      env.config[opt] = fn ? fn(val) : val
    }
  }

  set('lsAfterCd', Boolean)

  return saveEnv(env)
}

export async function install (opts, path, name) {
  let env = await readEnv()

  if (!path.startsWith('dat://')) {
    path = 'dat://' + joinPath(publicState.cwd.key, publicState.cwd.path, path)
  }
  if (!name) {
    name = path.split('/').pop().replace(/\.js/, '')
  }
  env.commands[name] = path
  return saveEnv(env)
}

export async function uninstall (opts, name) {
  let env = await readEnv()
  delete env.commands[name]
  return saveEnv(env)
}

export function recover (opts = {}) {
  let stored = JSON.parse(localStorage.getItem(ENV_STORAGE_KEY))
  let env = buildEnv(stored)

  if (opts.save || opts.s) {
    return saveEnv(env)
  }
  return JSON.stringify(env, null, 4)
}

/**
 * Private helpers
 */
async function readEnv () {
  let term = await publicState.home.archive.readFile('term.json')
  return JSON.parse(term)
}

async function saveEnv (env) {
  await saveHome(env)
  await selectHome(publicState.home.archive.url)
}