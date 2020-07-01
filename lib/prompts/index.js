"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswersProjectInfo = exports.getAnswersTemplate = exports.getAnswersCreate = void 0;
const enquirer_1 = __importDefault(require("enquirer"));
const message_1 = __importDefault(require("../utils/message"));
exports.getAnswersCreate = async () => {
    try {
        const answers = await enquirer_1.default.prompt([
            {
                name: 'createInCurrtent',
                message: '确认在当前目录下创建么？',
                type: 'confirm',
                initial: true,
                required: true,
            },
        ]);
        return answers;
    }
    catch (error) {
        error && message_1.default.error(`确认在当前目录创建异常：${error}`);
        process.exit(1);
    }
};
exports.getAnswersTemplate = async () => {
    try {
        const answers = await enquirer_1.default.prompt([
            {
                name: 'selectTemplate',
                message: '请选择模版',
                type: 'select',
                choices: [
                    { name: 'template-main', message: '主工程' },
                    { name: 'template-secondary', message: '子工程' },
                ],
                initial: 0,
                required: true,
            },
        ]);
        return answers;
    }
    catch (error) {
        error && message_1.default.error(`选择模版异常：${error}`);
        process.exit(1);
    }
};
exports.getAnswersProjectInfo = async (projectName) => {
    try {
        const answers = await enquirer_1.default.prompt([
            {
                name: 'isPrivate',
                message: '私有项目？默认不是私有',
                type: 'confirm',
                initial: false,
                required: true,
            },
            {
                name: 'projectName',
                message: '输入 package.json:name 名称，默认当前项目名',
                type: 'input',
                initial: projectName,
                required: true,
            },
            {
                name: 'projectVersion',
                message: '输入项目版本，默认 1.0.0',
                type: 'input',
                initial: '1.0.0',
                required: true,
            },
            {
                name: 'projectDescription',
                message: '输入项目介绍，默认空',
                type: 'input',
                initial: '',
                required: false,
            },
        ]);
        return answers;
    }
    catch (error) {
        error && message_1.default.error(`输入项目信息异常：${error}`);
        process.exit(1);
    }
};
