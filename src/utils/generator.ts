import Metalsmith from 'metalsmith';
import { handlebars } from 'consolidate';
import { success, error } from '@/utils/message';

const { render } = handlebars;

export default async (target: string, toPath: string, answersInfo: any) => {
  const MetalFilterProjectInfo: Metalsmith.Plugin = async (files, metal, done) => {
    try {
      const data = metal.metadata();
      Object.assign(data, answersInfo, { createYear: new Date().getFullYear() });
      done(null, files, metal);
    } catch (err) {
      done(err, files, metal);
    }
  };
  const MetalFilterRender: Metalsmith.Plugin = async (files, metal, done) => {
    try {
      const entries = Object.entries(files);
      for (const [fileName, file] of entries) {
        let content = file.contents.toString();
        if (fileName.endsWith('.hbs')) {
          // 目前仅仅后缀为 .hbs 的是模版

          // 用数据渲染模板
          content = await render(content, metal.metadata());
          // 渲染好的结果替换即可
          file.contents = Buffer.from(content);
          const fileNameNo = fileName.slice(0, -4);
          files[fileNameNo] = file;
          delete files[fileName];
        }
      }
      // console.info(files)
      done(null, files, metal);
    } catch (err) {
      done(err, files, metal);
    }
  };
  // console.info(target,toPath)
  await new Promise((resovle, reject) => {
    Metalsmith(__dirname)
      .source(target)
      .destination(toPath)
      .use(MetalFilterProjectInfo)
      .use(MetalFilterRender)
      .build((err) => {
        if (!err) {
          resovle();
          success('Template rendering successful');
        } else {
          error(`Template rendering abnormal: ${err}`);
          reject(err);
          process.exit(1);
        }
      });
  });
};
