#!/usr/bin/env node

const updateNotifier = require('update-notifier')
const checkEnv = require('../lib/checkEnv')
const { CLI } = require('../lib/cac')
const handleRegister = require('../cmd/registerCoreCmd')


CLI({
  async beforeParse(cli){
    const pkg = require('../package.json')
    checkEnv(pkg)
    updateNotifier({pkg}).notify()
    handleRegister(cli)
    cli.version(pkg.version).help()
  },

  async afterPArse(cli){
    if(!process.argv.slice(2).length){
      cli.outputHelp()
      process.exitCode=1
    }
  }
})