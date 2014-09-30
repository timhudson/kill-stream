var test = require('tape')
var through = require('through2')
var concat = require('concat-stream')
var killStream = require('./')

test('kill buffer', function(t) {
  t.plan(1)

  var ks = killStream(function(chunk) {
    return /duder/.test(chunk.toString())
  })

  var ts = through()

  ts.pipe(ks).pipe(concat(function(data) {
    t.equal(data.toString(), 'flipflopfloop')
  }))

  ts.write('flip')
  ts.write('flop')
  ts.write('floop')
  ts.write('duder')
})

test('kill objectMode', function(t) {
  t.plan(1)

  var ks = killStream.obj(function(obj) {
    return obj.name === 'duder'
  })

  var ts = through.obj()

  ts.pipe(ks).pipe(concat(function(data) {
    var names = data.reduce(function(memo, obj) {
      return memo + obj.name
    }, '')
    t.equal(names, 'flipflopfloop')
  }))

  ts.write({name: 'flip'})
  ts.write({name: 'flop'})
  ts.write({name: 'floop'})
  ts.write({name: 'duder'})
})

test('kill include-kill-chunk', function(t) {
  t.plan(1)

  var ks = killStream(function(chunk) {
    return /duder/.test(chunk.toString())
  }, true)

  var ts = through()

  ts.pipe(ks).pipe(concat(function(data) {
    t.equal(data.toString(), 'flipflopfloopduder')
  }))

  ts.write('flip')
  ts.write('flop')
  ts.write('floop')
  ts.write('duder')
})
