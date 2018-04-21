module.exports = (module) => {
  if (typeof require('electron') === 'string') {
    // Node process
    return
  }
  // Electron process
  const path = require('path')
  const electronVersion = process.versions.electron
  module.paths.unshift(path.resolve(
    __dirname,
    'electron-rebuild-modules',
    electronVersion,
    'node_modules',
  ))
}
