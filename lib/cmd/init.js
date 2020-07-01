"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const message_1 = __importDefault(require("../utils/message"));
const template_1 = __importDefault(require("../utils/template"));
const prompts_1 = require("../prompts");
async function init(projectName) {
    const list = fs_1.default.readdirSync(process.cwd());
    const rootName = path_1.default.basename(process.cwd());
    let toPath = '';
    try {
        if (!projectName) {
            const isCreate = await prompts_1.getAnswersCreate();
            if (!isCreate) {
                message_1.default.info('取消创建');
                process.exit(1);
            }
            projectName = rootName;
            toPath = path_1.default.resolve(process.cwd());
            if (list.length) {
                message_1.default.error(`当前目录${projectName}非空，请在空目录创建或 cli-kit init yourProject`);
                process.exit(1);
            }
        }
        else {
            if (list.some((name) => {
                const fileName = path_1.default.join(process.cwd(), name);
                const isDir = fs_1.default.statSync(fileName).isDirectory();
                return name === projectName && isDir;
            })) {
                message_1.default.error(`项目${projectName}已经存在`);
                process.exit(1);
            }
            else {
                fs_1.default.mkdirSync(projectName);
            }
            toPath = path_1.default.resolve(process.cwd(), projectName);
        }
        await template_1.default(toPath);
    }
    catch (error) {
        message_1.default.error(error);
        process.exit(1);
    }
}
exports.default = init;
;
