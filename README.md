As seen on https://github.com/yarnpkg/yarn/issues/5680#issuecomment-383237644 :)

To test this setup, run:

    yarn
    cd test   # or if you're on *nix: ./test/test.sh
    node node.js
    node electron.js

Subsequent additions / changes of packages should not result in unnecessary
rebuilds of native modules.

About the dependencies:

    "dependencies": {
      "better-sqlite3": "^4.1.0",     // included as an example, used by ./test/common.js
      "electron": "^2.0.0-beta.7"     // core dependency
    },
    "devDependencies": {
      "electron-rebuild": "^1.7.3",   // used by ./build/electron-rebuild-wrapper.js
      "fs-extra": "^5.0.0"            // used by ./build/electron-rebuild-wrapper.js
    }

For details on the `.yarnrc` configuration, see:
https://github.com/yarnpkg/yarn/pull/5314#issuecomment-374226071

License: MIT
