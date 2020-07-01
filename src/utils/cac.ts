import cac from 'cac';
import pkg from '@~/package.json';
import message from '@/utils/message';

interface ICLIProps {
  beforeParse: Function;
  afterParse: Function;
}

/**
 * Bootstrap a CAC cli
 * @param {function} beforeParse
 * @param {function} afterParse
 */
export async function CLI(lifecycle: ICLIProps) {
  const {beforeParse,afterParse} = lifecycle
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

export function wrapCommand(fn: Function) {
  return (...args: any) => {
    return fn(...args).catch((err: any) => {
      message.error(`[${fn.name}]: ${err}`)
      process.exit(1)
    })
  }
}
