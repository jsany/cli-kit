"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envinfo_1 = __importDefault(require("envinfo"));
const message_1 = __importDefault(require("../utils/message"));
async function default_1() {
    try {
        message_1.default.info('Environment Info:');
        const res = await envinfo_1.default.run({
            System: ['OS', 'CPU'],
            Binaries: ['Node', 'Yarn', 'npm'],
            Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari']
        }, {
            showNotFound: true,
            duplicates: true,
            fullTree: true
        });
        console.log(res);
    }
    catch (error) {
        message_1.default.error(error);
        process.exit(1);
    }
}
exports.default = default_1;
