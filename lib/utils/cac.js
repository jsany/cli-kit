"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCommand = exports.CLI = void 0;
const cac_1 = __importDefault(require("cac"));
const package_json_1 = __importDefault(require("../../package.json"));
const message_1 = __importDefault(require("./message"));
async function CLI(lifecycle) {
    const { beforeParse, afterParse } = lifecycle;
    const cli = cac_1.default(package_json_1.default.name);
    beforeParse && (await beforeParse(cli));
    cli.parse(process.argv);
    afterParse && (await afterParse(cli));
}
exports.CLI = CLI;
function wrapCommand(fn) {
    return (...args) => {
        return fn(...args).catch((err) => {
            message_1.default.error(`[${fn.name}]: ${err}`);
            process.exit(1);
        });
    };
}
exports.wrapCommand = wrapCommand;
