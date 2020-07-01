import {wrapCommand} from '@/utils/cac'
import init from '@/cmd/init'
import envinfo from '@/cmd/envinfo'
import {CAC} from 'cac'
/**
 * Expose registerCoreCommands function.
 */
export default function(cli:CAC,options={}){
  // 初始化
  cli
    .command('init [projectName]', '创建新项目')
    .action((projectName: string|undefined)=>{
      
      wrapCommand(init)(projectName)
    })

  // 查看本地环境信息
  cli.command('info', 'Shows debugging information about the local environment').action(() => {
    wrapCommand(envinfo)()
  })
}