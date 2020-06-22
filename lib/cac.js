const cac = require('cac')
const pkg = require('../package.json')
const message = require('./message');

/**
 * Bootstrap a CAC cli
 * @param {function} beforeParse
 * @param {function} afterParse
 */
async function CLI({ beforeParse, afterParse }) {
  const cli = cac(pkg.name)
  beforeParse && (await beforeParse(cli))
  cli.parse(process.argv)
  afterParse && (await afterParse(cli))
}

/**
 * Wrap a function to catch error.
 * @param {function} fn
 * @returns {function(...[*]): (*|Promise|Promise<T | never>)}
 */

function wrapCommand(fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      message.error(`[${fn.name}]: ${err}`)
      process.exit(1)
    })
  }
}

module.exports = {
  CLI,
  wrapCommand,
}