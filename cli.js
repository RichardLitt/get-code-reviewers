#!/usr/bin/env node
'use strict'

var meow = require('meow')
var getCodeReviewers = require('./')

var cli = meow([
  'Usage',
  '  $ get-code-reviewers [org] [since]',
  '',
  'Examples',
  '  $ get-code-reviewers ipfs 2016-01-15T00:20:24Z',
  '  RichardLitt'
])

getCodeReviewers({
  org: cli.input[0],
  since: cli.input[1]
})
