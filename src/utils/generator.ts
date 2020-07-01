import Metalsmith from 'metalsmith';
import { handlebars } from 'consolidate'
import path from 'path';
import {getAnswersProjectInfo} from '@/prompts';
import message from '@/utils/message';

const {render} = handlebars


export default async(target:string ,toPath: string)=>{
  const MetalFilterProjectInfo: Metalsmith.Plugin = async (files,metal,done) => {
    try {
      const projectName = path.basename(toPath)
      const answersInfo = await getAnswersProjectInfo(projectName)
      const data = metal.metadata()
      Object.assign(data, answersInfo)
      done(null,files,metal)
    } catch (err) {
      done(err,files,metal)
    }
  }
  const MetalFilterRender: Metalsmith.Plugin = async (files,metal,done) => {
    try {
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
      done(null,files,metal)
    } catch (err) {
      done(err,files,metal)
    }
  }
  await new Promise((resovle, reject)=>{
    Metalsmith(__dirname)
      .source(target)
      .destination(toPath)
      .use(MetalFilterProjectInfo)
      .use(MetalFilterRender)
      .build(err=>{
        if (!err) {
          resovle();
          message.success('模版渲染成功');
          process.exit(0);
        } else {
          message.error(`模版渲染异常：${err}`);
          reject(err);
          process.exit(1);
        }
      })
  })
}