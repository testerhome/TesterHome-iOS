var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var config = require('../config')

const API_PATH = urlJoin(config.apiHost, '/')

class TopStoryStore extends CollectionStore {
  static url() {

    return API_PATH
  }
  static fetch() {
    
    console.log("当前API为:"+API_PATH);
    return fetch(this.url())
      .then(response => response.json())
  }
  fetch() {
    return this.constructor.fetch()
      .then((items) => {
        this.reset(items)
        this.emitChange()
        return items
      })
  }
  ordered() {
    console.log(this.all())
    return _.sortBy(this.all(), 'position')
  }
}

module.exports = new TopStoryStore
