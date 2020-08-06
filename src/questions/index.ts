const { clikitConfig } = require('@@/scripts/getConfig');

export const getCommonCreateQuestions = (projectName: string) => [
  {
    name: 'isPrivate',
    message: '私有项目？默认不是私有',
    type: 'confirm',
    initial: false,
    required: true
  },
  {
    name: 'projectName',
    message: '输入 package.json:name 名称，默认当前项目名',
    type: 'input',
    initial: projectName,
    required: true
  },
  {
    name: 'projectVersion',
    message: '输入项目版本，默认 1.0.0',
    type: 'input',
    initial: '1.0.0',
    required: true
  },
  {
    name: 'projectDescription',
    message: '输入项目介绍，默认空',
    type: 'input',
    initial: 'TODO:',
    required: false
  }
];

export const checkDirQuestions = [
  {
    name: 'createInCurrtent',
    message: '确认在当前目录下创建么？',
    type: 'confirm',
    initial: true,
    required: true
  }
];

export const templateQuestions = [
  {
    name: 'template',
    message: '请选择本地/远程模版',
    type: 'select',
    choices: [
      { name: 'local', message: '本地模版(local)' },
      { name: 'remote', message: '远程模版(remote)' }
    ],
    initial: 0,
    required: true
  }
];

export const templateLocalQuestions = [
  {
    name: 'templateRepo',
    message: '请选择本地模版',
    type: 'select',
    // @ts-ignore
    choices: clikitConfig.localTemplates,
    initial: 0,
    required: true
  }
];

export const templateRemoteQuestions = [
  {
    name: 'templateRepo',
    message: '请选择远程模版',
    type: 'select',
    // @ts-ignore
    choices: clikitConfig.remoteTemplates,
    initial: 0,
    required: true
  }
];
