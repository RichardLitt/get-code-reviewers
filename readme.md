# get-code-reviewers [![Build Status](https://travis-ci.org/RichardLitt/get-code-reviewers.svg?branch=master)](https://travis-ci.org/RichardLitt/get-code-reviewers)

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/get-code-reviewers.svg)](https://greenkeeper.io/)

> Get users who comment on PRs or Code for OS GitHub Repos

This module returns a list of GitHub usernames who have commented on code or on PRs.


## Install

```
$ npm install --save get-code-reviewers
```


## Usage

```js
const getCodeReviewers = require('get-code-reviewers')

getCodeReviewers('ipfs', {
    since: '2016-01-15T00:20:24Z',
    until: '2016-01-20T00:20:24Z'
  })
//=> RichardLitt
```


## API

### getCodeReviewers(options)

#### org

Type: `string`

The organization to scour for comments.

#### options.repo

Type: `string`

The repository to get comments from.

#### options.since

Type: `string`

The ISO date from which to get comments that have been made.

#### options.until

Type: `string`

The ISO date before which to get comments that have been made.

## CLI

```
$ npm install --global get-code-reviewers
```

```
$ get-code-reviewers --help

  Usage
    get-code-reviewers <input> [opts]

  Examples
    $ get-code-reviewers ipfs --since=2016-01-15T00:20:24Z --until=2016-01-20T00:20:24Z
    RichardLitt
```


## License

MIT © [Richard Littauer](http://burntfen.com)
