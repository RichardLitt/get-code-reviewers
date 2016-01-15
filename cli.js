#!/usr/bin/env node
'use strict'

var meow = require('meow')
var getCodeReviewers = require('./')
var Promise = require('bluebird')

var cli = meow([
  'Usage',
  '  $ get-code-reviewers [org] [since]',
  '',
  'Examples',
  '  $ get-code-reviewers ipfs 2016-01-15T00:20:24Z',
  '  RichardLitt'
])

Promise.try(function () {
  return getCodeReviewers({
    org: cli.input[0],
    since: cli.input[1]
  })
}).map(function (response) {
  console.log(response)
})
