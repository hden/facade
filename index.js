const { find } = require('obj-case')
const identity = (x) => x

module.exports = function facade (obj = {}, specs = {}) {
  return new Proxy(specs, {
    get (_, prop) {
      if (Object.prototype.hasOwnProperty.call(specs, prop)) {
        const spec = specs[prop]
        const path = spec.path || spec
        const fn = spec.fn || identity
        const el = find(obj, path) || spec.default
        return fn(typeof el === 'function' ? el() : el, obj, specs)
      } else {
        return specs[prop]
      }
    }
  })
}
