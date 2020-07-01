"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const package_json_1 = __importDefault(require("../../package.json"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
function default_1(repo, opts = { clone: false }) {
    return new Promise((resolve, reject) => {
        const tmpDest = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), package_json_1.default.name));
        const spinner = ora_1.default('正在下载模板...');
        spinner.start();
        download_git_repo_1.default(repo, tmpDest, opts, (err) => {
            if (err) {
                spinner.fail(`下载失败: ${repo}`);
                reject(err);
            }
            else {
                fs_extra_1.default.removeSync(path_1.default.join(tmpDest, '.git'));
                spinner.succeed('下载成功');
                resolve(tmpDest);
            }
        });
    });
}
exports.default = default_1;
;
