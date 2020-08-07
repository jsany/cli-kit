const { clikitConfig } = require('@@/scripts/getConfig');

export const getCommonCreateQuestions = (projectName: string) => [
  {
    name: 'isPrivate',
    message: 'Private projects? The default is not private',
    type: 'confirm',
    initial: false,
    required: true
  },
  {
    name: 'projectName',
    message: 'Enter package.json name, default current project name',
    type: 'input',
    initial: projectName,
    required: true
  },
  {
    name: 'projectVersion',
    message: 'Enter the project version, which defaults to 1.0.0',
    type: 'input',
    initial: '1.0.0',
    required: true
  },
  {
    name: 'projectDescription',
    message: 'Enter project description. Default is TODO:',
    type: 'input',
    initial: 'TODO:',
    required: false
  }
];

export const checkDirQuestions = [
  {
    name: 'createInCurrtent',
    message: 'Are you sure to create in the current directory?',
    type: 'confirm',
    initial: true,
    required: true
  }
];

export const templateQuestions = [
  {
    name: 'template',
    message: 'Please select local/remote templates',
    type: 'select',
    choices: [
      { name: 'local', message: 'Local template (local)' },
      { name: 'remote', message: 'Remote template (remote)' }
    ],
    initial: 0,
    required: true
  }
];

export const templateLocalQuestions = [
  {
    name: 'templateRepo',
    message: 'Please select a local template',
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
    message: 'Please select a remote template',
    type: 'select',
    // @ts-ignore
    choices: clikitConfig.remoteTemplates,
    initial: 0,
    required: true
  }
];
