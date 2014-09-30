var through = require('through2')

module.exports = function(fn, includeKill) {
  return through(createCheck(fn, includeKill))
}

module.exports.obj = function(fn, includeKill) {
  return through.obj(createCheck(fn, includeKill))
}

function createCheck(fn, includeKill) {
  return function(chunk, enc, callback) {
    if (fn(chunk)) {
      if (includeKill) this.push(chunk)
      return this.push(null)
    }

    this.push(chunk)
    callback()
  }
}
