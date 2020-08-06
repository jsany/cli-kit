const { configPath, configName } = require('./configPath');
const { resolve } = require('path');
const { existsSync, copyFileSync } = require('fs-extra');

function initConfig(reset = false) {
  try {
    const originConfigPath = resolve(__dirname, `../${configName}`);

    if (!existsSync(configPath) || reset) {
      copyFileSync(originConfigPath, configPath);
    }
    console.log('clikit init success!');
    // console.log(process.clikit)
  } catch (err) {
    console.error('clikit Config init failed');
    process.exit(1);
  }
}

module.exports = initConfig;
