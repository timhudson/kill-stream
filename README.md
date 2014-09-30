# kill-stream

Close a stream when test function returns truthy value

[![build status](http://img.shields.io/travis/timhudson/kill-stream.svg?style=flat)](http://travis-ci.org/timhudson/kill-stream)

## Example

``` js
var killStream = require('kill-stream')
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
```

## killStream(test=fn, includeKill=Boolean)

Closes stream when `test` returns truthy value. Pass truthy `includeKill`
value if you want the last chunk to be included in output.

## killStream.obj(test=fn, includeKill=Boolean)

Object

## License

MIT
