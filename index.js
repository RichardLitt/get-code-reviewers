'use strict'

const Octokat = require('octokat')
const octo = new Octokat({
  token: process.env.GITHUB_OGN_TOKEN
})
const Promise = require('bluebird')
const moment = require('moment')
const _ = require('lodash')
const depaginate = require('depaginate')
const getGithubUser = require('get-github-user')

module.exports = function (org, opts) {
  return Promise.resolve(getGithubUser(org))
  .then((user) => {
    if (user.length === 0) {
      throw new Error(org + 'is not a valid GitHub user')
    } else {
      return user
    }
  })
  .map(user => {
    return depaginate(function (opts) {
      return (opts.org.type === 'Organization') ? octo.orgs(org).repos.fetch(opts) : octo.users(org).repos.fetch(opts)
    }, {
      org: user
    })
  })
  .then(_.flatten.bind(_))
  .filter(response => (opts.repo) ? response.name === opts.repo : response)
  .map(repo => {
    // TODO Add depaginate. These are not complete until this is added.
    return Promise.join(
      octo.repos(org, repo.name).comments.fetch({
        org: org,
        per_page: 100,
        repoName: repo.name,
        since: opts.since || '1980-01-01T00:01:02Z'
      }),
      octo.repos(org, repo.name).pulls.comments.fetch({
        org: org,
        per_page: 100,
        repoName: repo.name,
        since: opts.since || '1980-01-01T00:01:02Z'
      }),
      function (codeCommenters, prCommenters) {
        var union = _.union(codeCommenters, prCommenters)
        return union
      })
  })
  .then(_.flatten.bind(_))
  .filter(function (response) {
    if (opts.since && opts.until && moment(response.updatedAt).isBetween(opts.since, opts.until)) {
      return response
    } else if (opts.since && !opts.until && moment(response.updatedAt).isAfter(opts.since)) {
      return response
    } else if (!opts.since && opts.until && moment(response.updatedAt).isBefore(opts.until)) {
      return response
    } else if (!opts.since && !opts.until) {
      return response
    }
  })
  .map(response => response.user.login)
  .then(response => _.uniq(_.without(response, undefined)))
  .catch(err => {
    console.log('Unable to get unique users', err)
  })
}
