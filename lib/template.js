const message = require('./message');
const download = require('./download');
const generator = require('./generator');
const {getAnswersTemplate} = require('../prompts');

module.exports = async function selectTemplate(toPath) {
  try {
    const answersTemplate = await getAnswersTemplate();

    // 下载模版，返回临时目录
    const tmpDest = await download(`github:jsany/${answersTemplate.selectTemplate}`);

    // 实现脚手架给模板插值的功能并复制到项目目录中
    await generator(tmpDest,toPath)

    message.success('创建成功');
    process.exitCode = 0;
    return
  } catch (error) {
    message.error(`创建失败：${error}`);
    process.exitCode = 1;
    return
  }
};
