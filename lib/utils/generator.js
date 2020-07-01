"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metalsmith_1 = __importDefault(require("metalsmith"));
const consolidate_1 = require("consolidate");
const path_1 = __importDefault(require("path"));
const prompts_1 = require("../prompts");
const message_1 = __importDefault(require("./message"));
const { render } = consolidate_1.handlebars;
exports.default = async (target, toPath) => {
    const MetalFilterProjectInfo = async (files, metal, done) => {
        try {
            const projectName = path_1.default.basename(toPath);
            const answersInfo = await prompts_1.getAnswersProjectInfo(projectName);
            const data = metal.metadata();
            Object.assign(data, answersInfo);
            done(null, files, metal);
        }
        catch (err) {
            done(err, files, metal);
        }
    };
    const MetalFilterRender = async (files, metal, done) => {
        try {
            const entries = Object.entries(files);
            for (const [fileName, file] of entries) {
                let content = file.contents.toString();
                if (fileName.endsWith('package.json')) {
                    content = await render(content, metal.metadata());
                    file.contents = Buffer.from(content);
                }
            }
            done(null, files, metal);
        }
        catch (err) {
            done(err, files, metal);
        }
    };
    await new Promise((resovle, reject) => {
        metalsmith_1.default(__dirname)
            .source(target)
            .destination(toPath)
            .use(MetalFilterProjectInfo)
            .use(MetalFilterRender)
            .build(err => {
            if (!err) {
                resovle();
                message_1.default.success('模版渲染成功');
                process.exit(0);
            }
            else {
                message_1.default.error(`模版渲染异常：${err}`);
                reject(err);
                process.exit(1);
            }
        });
    });
};
