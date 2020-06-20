const path = require('path');
const fs = require('fs');
const os = require('os');
const ora = require('ora');
const fse = require('fs-extra');
const pkg = require('../package.json');
const download = require('download-git-repo');

module.exports = function (repo, opts = { clone: false }) {
  return new Promise((resolve, reject) => {
    // 下载到临时目录
    const tmpDest = fs.mkdtempSync(path.join(os.tmpdir(), pkg.name));

    const spinner = ora('正在下载模板...');
    spinner.start();
    /* setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Loading rainbows';
    }, 1000); */
    download(repo, tmpDest, opts, (err) => {
      if (err) {
        spinner.fail(`下载失败: ${repo}`);
        reject(err);
      } else {
        fse.removeSync(path.join(tmpDest, '.git'));
        spinner.succeed('下载成功');
        resolve(tmpDest);
      }
    });
  });
};
