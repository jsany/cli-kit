import chalk from 'chalk';
import semver from 'semver';

export default function checkEnv(pkg: any) {
  const requiredVersion = pkg.engines.node

  if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(
      chalk.red(
        `\n[${pkg.name}] minimum Node version not met:` +
          `\nYou are using Node ${process.version}, but ${pkg.name} ` +
          `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`,
      ),
    )
    process.exit(1)
  }
}