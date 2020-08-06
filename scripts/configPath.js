const { homedir } = require('os');
const { resolve } = require('path');

const homePath = homedir();
const configName = '.clikitrc.json';
const configPath = `${homePath}/${configName}`;

module.exports = {
  configName,
  configPath,
  configFolder: homePath
};
