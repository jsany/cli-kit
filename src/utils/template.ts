import message from '@/utils/message';
import download from '@/utils/download';
import generator from '@/utils/generator';
import {getAnswersTemplate} from '@/prompts';

export default async function selectTemplate(toPath: string) {
  try {
    const answersTemplate = await getAnswersTemplate();

    // 下载模版，返回临时目录
    const tmpDest: string = await download(`github:jsany/${answersTemplate.selectTemplate}`);

    // 实现脚手架给模板插值的功能并复制到项目目录中
    await generator(tmpDest,toPath)

    message.success('创建成功');
    process.exit(0);
  } catch (error) {
    message.error(`创建失败：${error}`);
    process.exit(1);
  }
};
