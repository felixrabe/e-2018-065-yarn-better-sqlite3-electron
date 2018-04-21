require('../build/modify-module-paths')(module)

const tryModule = (name) => {
  process.stdout.write(`Trying ${name}... `)
  try {
    require(name)
    process.stdout.write('SUCCESS\n')
  } catch (err) {
    process.stdout.write('FAIL\n')
    // console.error(err.stack || err)
  }
}

tryModule('better-sqlite3')
