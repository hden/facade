/* eslint-env node, mocha */

const assert = require('power-assert')
const facade = require('../')

describe('facade', () => {
  let obj
  let proxy
  beforeEach(() => {
    obj = {
      name: 'Flight of the Conchords',
      members: {
        Brett: 'Likes animals',
        Jemaine: 'Rock and roll',
        Murray: 'Band manager'
      },
      band: { meeting: { present: true } },
      method: function () { return true },
      dates: {
        start: '2014-01-01',
        end: '2014-02-01'
      }
    }

    proxy = facade(obj, {
      members: 'members',
      brett: 'members.Brett',
      present: 'band.meeting.present',
      method: 'method',
      foo: {
        path: 'foo',
        default: 'bar'
      },
      start: {
        path: 'dates.start',
        fn: (x) => (new Date(x)).toISOString()
      }
    })
  })

  it('should proxy a single field', () => {
    assert.deepEqual(proxy.members, obj.members)
  })

  it('should proxy a nested field', () => {
    assert.deepEqual(proxy.brett, obj.members.Brett)
  })

  it('should proxy a multiple-nested field', () => {
    assert.deepEqual(proxy.present, obj.band.meeting.present)
  })

  it('should proxy a method', () => {
    assert(proxy.method === obj.method())
  })

  it('should use the default value', () => {
    assert(proxy.foo === 'bar')
  })

  it('should transform', () => {
    assert(proxy.start == (new Date(obj.dates.start)).toISOString())
  })
})
