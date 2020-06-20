const chalk = require('chalk');
const semver = require('semver');


module.exports = function checkEnv(pkg) {
  const requiredVersion = pkg.engines.node

  if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(
      chalk.red(
        `\n[${pkg.name}] minimum Node version not met:` +
          `\nYou are using Node ${process.version}, but ${pkg.name} ` +
          `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`,
      ),
    )
    process.exitCode=1
    return
  }
}