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
  cli.command('init [projectName]', '创建新项目').action((projectName: string | undefined) => {
    wrapCommand(init)(projectName);
  });

  // 查看本地环境信息
  cli.command('info', '查看本地环境信息').action(() => {
    wrapCommand(envinfo)();
  });

  // 查看配置信息
  cli.command('config', '查看配置信息').action(() => {
    wrapCommand(list)();
  });
}
