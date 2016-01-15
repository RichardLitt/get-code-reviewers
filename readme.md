# get-code-reviewers [![Build Status](https://travis-ci.org/RichardLitt/get-code-reviewers.svg?branch=master)](https://travis-ci.org/RichardLitt/get-code-reviewers)

> Get users who comment on PRs or Code for OS GitHub Repos

This module returns a list of GitHub usernames who have commented on code or on PRs.


## Install

```
$ npm install --save get-code-reviewers
```


## Usage

```js
const getCodeReviewers = require('get-code-reviewers');

getCodeReviewers({
    org: 'ipfs',
    since: '2016-01-15T00:20:24Z'
  });
//=> RichardLitt
```


## API

### getCodeReviewers(options)

#### options.org

Type: `string`

The organization to scour for comments.

#### options.since

Type: `string`

The ISO date from which to get comments that have been made.

## CLI

```
$ npm install --global get-code-reviewers
```

```
$ get-code-reviewers --help

  Usage
    get-code-reviewers [org] [since]

  Examples
    $ get-code-reviewers ipfs 2016-01-15T00:20:24Z
    RichardLitt
```


## License

MIT © [Richard Littauer](http://burntfen.com)
