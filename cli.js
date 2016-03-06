#!/usr/bin/env node
'use strict'

const meow = require('meow')
const getCodeReviewers = require('./')
const Promise = require('bluebird')
const gitconfig = require('gitconfiglocal')
const pify = require('pify')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'ghPRCreators',
  note: 'Get GitHub PR creators',
  userAgent: 'ghPRCreators',
  scope: ['repo']
}

var cli = meow([`
  Usage
    $ get-code-reviewers [input]

  Options
    -r, --repo Only for a specific repo. [Default: false]
    -s, --since Only since a specific time. [Default: false]
    -u, --until Only to a specific time. [Default: false]

  Examples
    $ get-code-reviewiers
    RichardLitt
    $ get-code-reviewers ipfs --since=2016-01-15T00:20:24Z --until=2016-01-20T00:20:24Z
    RichardLitt
`, {
  alias: {
    s: 'since',
    u: 'until',
    r: 'repo'
  }
}])

Promise.try(() => {
  return pify(gitconfig)(process.cwd())
}).then((config) => {
  if (config && config.remote && config.remote.origin && config.remote.origin.url) {
    return config.remote.origin.url.split(':')[1].split('.git')[0].split('/')
  }
}).then((res) => {
  if (res && cli.input.length === 0) {
    cli.input[0] = res[0]
    cli.flags['repo'] = res[1]
  }
  return ghauth(authOptions)
}).then((authData) => {
  return getCodeReviewers(cli.input[0], cli.flags, authData.token)
}).map(function (response) {
  console.log(response)
})
