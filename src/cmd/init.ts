import { resolve } from 'path';
import { warning, error } from '@/utils/message';
import checkDir from '@/utils/checkDir';
import getRootDir from '@/utils/getRootDir';
import {
  getAnswersTemplate,
  getAnswersLocalTemplate,
  getAnswersRemoteTemplate,
  getAnswersProjectInfo
} from '@/prompts';
import download from '@/utils/download';
import generator from '@/utils/generator';
import bootstrap from '@/utils/bootstrap';

export default async (projectName: string | undefined): Promise<any> => {
  try {
    // 目录校验
    const { toPath, projectName: proj } = await checkDir(projectName);
    let [target, answersTemplate]: [string, any] = ['', {}];

    // 选择 本地/远程模板
    const answersLocalOrRemote = await getAnswersTemplate();
    // console.info(answersLocalOrRemote);
    if (answersLocalOrRemote.template === 'local') {
      // 选择本地模板
      answersTemplate = await getAnswersLocalTemplate();
      target = resolve(getRootDir(), 'templates', answersTemplate.templateRepo);
    } else if (answersLocalOrRemote.template === 'remote') {
      // 选择远程模板
      answersTemplate = await getAnswersRemoteTemplate();

      // 下载远程仓库模版，返回临时目录
      target = await download(answersTemplate.templateRepo);
    } else {
      warning('Please select local/remote templates');
      process.exit(1);
    }

    // 输入项目信息，用来填充到模板
    const answersInput = await getAnswersProjectInfo(proj!);

    // 实现脚模板插值并复制到项目目录中
    await generator(target, toPath, answersInput);

    // 初始化
    await bootstrap(answersLocalOrRemote.template, answersTemplate.templateRepo);
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
