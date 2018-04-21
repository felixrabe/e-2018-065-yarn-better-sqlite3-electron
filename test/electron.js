const electron = require('electron')

if (typeof electron === 'string') {
  require('child_process').spawnSync(electron, [__filename], {stdio: 'inherit'})
} else {
  try {
    require('./common.js')
  } catch (err) {
    console.error(err.stack || err)
  }
  electron.app.quit()
}
