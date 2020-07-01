"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("../utils/cac");
const init_1 = __importDefault(require("./init"));
const envinfo_1 = __importDefault(require("./envinfo"));
function default_1(cli, options = {}) {
    cli
        .command('init [projectName]', '创建新项目')
        .action((projectName) => {
        cac_1.wrapCommand(init_1.default)(projectName);
    });
    cli.command('info', 'Shows debugging information about the local environment').action(() => {
        cac_1.wrapCommand(envinfo_1.default)();
    });
}
exports.default = default_1;
