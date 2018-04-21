const { spawnSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

const r = path.resolve

const rPkgPath = (...p) => r(...p, 'package.json')
const rPkgJson = (...p) => fs.readJsonSync(rPkgPath(...p))

const nodeModulesPath = r(__dirname, '..', 'node_modules')

const electronVersion = rPkgJson(path.dirname(require.resolve('electron'))).version

const electronRebuildPath = r(__dirname, 'electron-rebuild-modules', electronVersion)
const electronModulesPath = r(electronRebuildPath, 'node_modules')

const resolveModules = (m) => ({n: r(nodeModulesPath, m), e: r(electronModulesPath, m)})

if (fs.existsSync(electronModulesPath)) {
  for (const m of fs.readdirSync(electronModulesPath)) {
    const n = r(nodeModulesPath, m)
    const e = r(electronModulesPath, m)
    if (fs.existsSync(n)) {
      if (rPkgJson(n).version === rPkgJson(e).version) {
        // keep
        continue
      }
    }
    fs.removeSync(e)
  }
}

const deps = Object.create(null)
// const rebuildRequiredForModules = []

for (const m of fs.readdirSync(nodeModulesPath)) {
  if (fs.existsSync(r(nodeModulesPath, m, 'binding.gyp'))) {
    const n = r(nodeModulesPath, m)
    const e = r(electronModulesPath, m)
    deps[m] = '*'
    if (!fs.existsSync(e)) {
      fs.copySync(n, e)
      // rebuildRequiredForModules.push(m)
    }
  }
}

const electronRebuildPkgPath = rPkgPath(electronRebuildPath)
const pkg = {
  dependencies: deps
}
fs.outputJsonSync(electronRebuildPkgPath, pkg, { spaces: 2 })
// console.log(rebuildRequiredForModules)

const rebuildCmd = r(nodeModulesPath, '.bin', 'electron-rebuild')

const result = spawnSync(rebuildCmd, { cwd: electronRebuildPath, stdio: 'inherit' }) // stdio: 'ignore'
if (result.error) {
  throw result.error
}
if (result.status !== 0) {
  throw new Error(`Child process failed with status ${result.status}`)
}

console.log('done')
