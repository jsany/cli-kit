import {wrapCommand} from '@/utils/cac'
import init from '@/cmd/init'
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
}