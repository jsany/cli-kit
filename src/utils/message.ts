import chalk from 'chalk';
import logSymbols from 'log-symbols';

export const success = (str:string) => {
  // 成功用绿色显示，给出积极的反馈
  console.log(logSymbols.success, chalk.green(str));
};

export const error = (str:string) => {
  // 失败了用红色，增强提示
  console.log(logSymbols.error, chalk.red(str));
};

export const info = (str:string) => {
  console.log(logSymbols.info, chalk.blue(str));
};

export const warning = (str:string) => {
  console.log(logSymbols.warning, chalk.magenta(str));
};

export default {
  success,
  error,
  info,
  warning,
}