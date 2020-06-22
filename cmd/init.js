const fs = require('fs');
const path = require('path');
const enquirer = require('enquirer');
const message = require('../lib/message');
const selectTemplate = require('../lib/template');
const { getAnswersCreate } = require('../prompts');

module.exports = async function init(projectName) {
  const list = fs.readdirSync(process.cwd());
  const rootName = path.basename(process.cwd()); // 当前目录名称
  let toPath = ''
  try {
    if (!projectName) {
      // 未输入项目名字，询问是否在当前目录创建
      const isCreate = await getAnswersCreate();
      if (!isCreate) {
        message.info('取消创建');
        process.exit(1);
      }

      projectName = rootName;
      toPath = path.resolve(process.cwd())
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
      toPath = path.resolve(process.cwd(),projectName)
    }
    await selectTemplate(toPath);
  } catch (error) {
    message.error(error);
    process.exit(1);
  }
};
