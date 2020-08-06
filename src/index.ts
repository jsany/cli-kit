import updateNotifier from 'update-notifier';
import checkEnv from '@/utils/checkEnv';
import { CLI } from '@/utils/cac';
import handleRegister from '@/registerCoreCmd';
import pkg from '@@/package.json';
import { CAC } from 'cac';

CLI({
  async beforeParse(cli: CAC) {
    checkEnv(pkg);
    updateNotifier({ pkg }).notify();
    handleRegister(cli);
    cli.version(pkg.version).help();
  },

  async afterParse(cli: CAC) {
    if (!process.argv.slice(2).length) {
      cli.outputHelp();
      process.exit(1);
    }
  }
});
