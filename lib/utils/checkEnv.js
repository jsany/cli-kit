"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const semver_1 = __importDefault(require("semver"));
function checkEnv(pkg) {
    const requiredVersion = pkg.engines.node;
    if (!semver_1.default.satisfies(process.version, requiredVersion)) {
        console.log(chalk_1.default.red(`\n[${pkg.name}] minimum Node version not met:` +
            `\nYou are using Node ${process.version}, but ${pkg.name} ` +
            `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`));
        process.exit(1);
    }
}
exports.default = checkEnv;
