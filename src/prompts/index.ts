import enquirer from 'enquirer';
import { error } from '@/utils/message';
import {
  getCommonCreateQuestions,
  checkDirQuestions,
  templateQuestions,
  templateRemoteQuestions,
  templateLocalQuestions
} from '@/questions';

export const getAnswersCreate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(checkDirQuestions);
    return answers;
  } catch (err) {
    err && error(`Check create exceptions:${err}`);
    process.exit(1);
  }
};

export const getAnswersTemplate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(templateQuestions);
    return answers;
  } catch (err) {
    err && error(`Select the local/remote template exception:${err}`);
    process.exit(1);
  }
};

export const getAnswersLocalTemplate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(templateLocalQuestions);
    return answers;
  } catch (err) {
    err && error(`Select local template exception:${err}`);
    process.exit(1);
  }
};

export const getAnswersRemoteTemplate = async (): Promise<any> => {
  try {
    const answers = await enquirer.prompt(templateRemoteQuestions);
    return answers;
  } catch (err) {
    err && error(`Choose remote template exception:${err}`);
    process.exit(1);
  }
};

export const getAnswersProjectInfo = async (projectName: string): Promise<any> => {
  try {
    const answers = await enquirer.prompt([...getCommonCreateQuestions(projectName)]);
    return answers;
  } catch (err) {
    err && error(`Exception to input project information:${err}`);
    process.exit(1);
  }
};
