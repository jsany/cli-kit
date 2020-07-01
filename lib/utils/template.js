"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("./message"));
const download_1 = __importDefault(require("./download"));
const generator_1 = __importDefault(require("./generator"));
const prompts_1 = require("../prompts");
async function selectTemplate(toPath) {
    try {
        const answersTemplate = await prompts_1.getAnswersTemplate();
        const tmpDest = await download_1.default(`github:jsany/${answersTemplate.selectTemplate}`);
        await generator_1.default(tmpDest, toPath);
        message_1.default.success('创建成功');
        process.exit(0);
    }
    catch (error) {
        message_1.default.error(`创建失败：${error}`);
        process.exit(1);
    }
}
exports.default = selectTemplate;
;
