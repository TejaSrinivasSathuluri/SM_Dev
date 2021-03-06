'use strict';

module.exports = function stubs(obj, method, cfg, stub) {
  if (!obj || !method || !obj[method])
    throw new Error('You must provide an object and a key for an existing method')

  if (!stub) {
    stub = cfg
    cfg = {}
  }

  stub = stub || function() {}

  cfg.callthrough = cfg.callthrough || false
  cfg.calls = cfg.calls || 0

  var norevert = cfg.calls === 0

  var cached = obj[method].bind(obj)

  obj[method] = function() {
    var args = [].slice.call(arguments)

    if (cfg.callthrough)
      cached.apply(obj, args)

    stub.apply(obj, args)

    if (!norevert && --cfg.calls === 0)
      obj[method] = cached
  }
}
