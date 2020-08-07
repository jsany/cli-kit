import path from 'path';
import os from 'os';
import ora from 'ora';
import fse from 'fs-extra';
import download from 'download-git-repo';

export default function (repo: string, opts = { clone: false }): Promise<any> {
  return new Promise((resolve, reject) => {
    // 下载到临时目录
    const tmpDest = fse.mkdtempSync(path.join(os.tmpdir(), repo.split('/').pop() || 'temp'));

    const spinner = ora('Downloading the template ...');
    spinner.start();
    /* setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Loading rainbows';
    }, 1000); */
    download(repo, tmpDest, opts, (err: any) => {
      if (err) {
        spinner.fail(`Download failed: ${repo}`);
        reject(err);
      } else {
        fse.removeSync(path.join(tmpDest, '.git'));
        spinner.succeed('Download successful');
        resolve(tmpDest);
      }
    });
  });
}
