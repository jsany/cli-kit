import fs from 'fs';
import path from 'path';
import message from '@/utils/message';
import { getAnswersCreate } from '@/prompts';

export default async function checkDir(projectName: string | undefined) {
  const list = fs.readdirSync(process.cwd());
  const rootName = path.basename(process.cwd()); // 当前目录名称
  const res = {
    pass: false,
    toPath: ''
  };
  try {
    if (!projectName) {
      // 未输入项目名字，询问是否在当前目录创建
      const isCreate = await getAnswersCreate();
      if (!isCreate) {
        message.info('取消创建');
        process.exit(1);
      }

      projectName = rootName;
      res.toPath = path.resolve(process.cwd());
      if (list.length) {
        // 当前目录非空，则不符合创建条件
        message.error(`当前目录${projectName}非空，请在空目录创建或 cli-kit init yourProject`);
        process.exit(1);
      }
    } else {
      // 检查输入的项目名字，在当前目录是否存在该项目，若存在，则提示项目已经存在，若不存在，则创建该目录
      if (
        list.some((name) => {
          const fileName = path.join(process.cwd(), name);
          const isDir = fs.statSync(fileName).isDirectory();
          return name === projectName && isDir;
        })
      ) {
        message.error(`项目${projectName}已经存在`);
        process.exit(1);
      } else {
        fs.mkdirSync(projectName);
      }
      res.toPath = path.resolve(process.cwd(), projectName);
    }
    return res;
  } catch (error) {
    message.error(error);
    process.exit(1);
  }
}
