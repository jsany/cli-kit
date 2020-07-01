"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_notifier_1 = __importDefault(require("update-notifier"));
const checkEnv_1 = __importDefault(require("./utils/checkEnv"));
const cac_1 = require("./utils/cac");
const registerCoreCmd_1 = __importDefault(require("./cmd/registerCoreCmd"));
const package_json_1 = __importDefault(require("../package.json"));
cac_1.CLI({
    async beforeParse(cli) {
        checkEnv_1.default(package_json_1.default);
        update_notifier_1.default({ pkg: package_json_1.default }).notify();
        registerCoreCmd_1.default(cli);
        cli.version(package_json_1.default.version).help();
    },
    async afterParse(cli) {
        if (!process.argv.slice(2).length) {
            cli.outputHelp();
            process.exit(1);
        }
    }
});
