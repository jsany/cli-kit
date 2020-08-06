import { error } from '@/utils/message';
import { exec } from 'child_process';
import { promisify } from 'util';
import ora from 'ora';
const { clikitConfig } = require('@@/scripts/getConfig');

const execWait = promisify(exec);
// @ts-ignore
const { bootstrap, localTemplates, remoteTemplates } = clikitConfig;

export default async (type: 'local' | 'remote', current: string): Promise<any> => {
  try {
    if (type === 'local') {
      const item = localTemplates.find((item: { name: string }) => item.name === current);
      item && Object.assign(bootstrap, item.bootstrap);
    }
    if (type === 'remote') {
      const item = remoteTemplates.find((item: { name: string }) => item.name === current);
      item && Object.assign(bootstrap, item.bootstrap);
    }
    // console.info(bootstrap)
    // 执行 npm 命令，例如 安装依赖
    for (const cmd of bootstrap.npm || []) {
      const spinner = ora(`正在执行 ${cmd}`);
      spinner.start();
      await execWait(cmd);
      spinner.succeed(`执行完成 ${cmd}`);
    }

    // 执行 git 命令，例如 初始化
    for (const cmd of bootstrap.git || []) {
      const spinner = ora(`正在执行 ${cmd}`);
      spinner.start();
      await execWait(cmd);
      spinner.succeed(`执行完成 ${cmd}`);
    }

    // 用编辑器(vscode)打开
    for (const cmd of bootstrap.open || []) {
      const spinner = ora(`正在执行 ${cmd}`);
      spinner.start();
      await execWait(cmd);
      spinner.succeed(`执行完成 ${cmd}`);
    }
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
