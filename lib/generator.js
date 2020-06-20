const MetalSmith = require('metalsmith');
const { render } = require('consolidate').handlebars;
const { promisify } = require('util');
const path = require('path')
const {getAnswersProjectInfo} = require('../prompts');
const message = require('./message');


module.exports = async(target,toPath)=>{
  const MetalFilterProjectInfo = async (files,metal,done) => {
    const projectName = path.basename(toPath)
    const answersInfo = await getAnswersProjectInfo(projectName)
    const data = metal.metadata()
    Object.assign(data, answersInfo)
    done();
  }
  const MetalFilterRender = async (files,metal,done) => {
    const entries = Object.entries(files);
    for (const [fileName,file] of entries) {
      let content = file.contents.toString()
      if(fileName.endsWith('package.json')){
        // 目前仅仅 package.json 是 模版

        // 用数据渲染模板
        content = await render(content, metal.metadata()); 
        // 渲染好的结果替换即可
        file.contents = Buffer.from(content)
      }
    }
    done()
  }
  await new Promise((resovle, reject)=>{
    MetalSmith(__dirname)
      .source(target)
      .destination(toPath)
      .use(MetalFilterProjectInfo)
      .use(MetalFilterRender)
      .build(err=>{
        if (!err) {
          resovle();
          message.success('模版渲染成功');
          process.exitCode = 0;
          return
        } else {
          message.error(`模版渲染异常：${err}`);
          reject(err);
          process.exitCode = 1;
          return
        }
      })
  })
}