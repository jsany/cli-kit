const {wrapCommand} = require('../lib/cac')
const init = require('./init')
/**
 * Expose registerCoreCommands function.
 */
module.exports = function(cli,options={}){
  // 初始化
  cli
    .command('init [projectName]', '创建新项目')
    .action((projectName)=>{
      
      wrapCommand(init)(projectName)
    })
}