const chalk = require('chalk');
const logSymbols = require('log-symbols');

exports.success = str => {
  // 成功用绿色显示，给出积极的反馈
  console.log(logSymbols.success, chalk.green(str));
};

exports.error = str => {
  // 失败了用红色，增强提示
  console.log(logSymbols.error, chalk.red(str));
};

exports.info = str => {
  console.log(logSymbols.info, chalk.blue(str));
};

exports.warning = str => {
  console.log(logSymbols.warning, chalk.magenta(str));
};