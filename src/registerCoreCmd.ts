import { wrapCommand } from '@/utils/cac';
import init from '@/cmd/init';
import envinfo from '@/cmd/envinfo';
import { CAC } from 'cac';
import { list } from '@/cmd/config';

/**
 * Expose registerCoreCommands function.
 */
export default function (cli: CAC, options = {}) {
  // 初始化，创建项目
  cli
    .command('init [projectName]', 'create new project')
    .action((projectName: string | undefined) => {
      wrapCommand(init)(projectName);
    });

  // 查看本地环境信息
  cli.command('info', 'cat local env').action(() => {
    wrapCommand(envinfo)();
  });

  // 查看配置信息
  cli.command('config', 'cat cli config').action(() => {
    wrapCommand(list)();
  });
}
