var killStream = require('./')
var JSONStream = require('JSONStream')
var request = require('request')

var twoHoursAgo = (new Date(Date.now() - 3600000))
  .toISOString()
  .replace(/\.\d+Z$/, 'Z')

function test(obj) {
  return obj.created_at < twoHoursAgo
}

var options = {
  url: 'https://api.github.com/repos/joyent/node/events',
  headers: {'user-agent': 'pug'}
}

request(options)
  .pipe(JSONStream.parse('*'))
  .pipe(killStream.obj(test))
  .on('data', function(data) {
    console.log(data.created_at)
  })
