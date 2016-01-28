#!/usr/bin/env node
'use strict'

var meow = require('meow')
var getCodeReviewers = require('./')
var Promise = require('bluebird')

var cli = meow([`
  Usage
    $ get-code-reviewers <input> [opts]

  Options
    -r, --repo A repository to search in
    -s, --since Add a time since
    -u, --until Add a time to

  Examples
    $ get-code-reviewers ipfs --since=2016-01-15T00:20:24Z --until=2016-01-20T00:20:24Z
    RichardLitt
`, {
  alias: {
    s: 'since',
    u: 'until',
    r: 'repo'
  }
}])

Promise.try(function () {
  return getCodeReviewers(cli.input[0], cli.flags)
})
.map(function (response) {
  console.log(response)
})
