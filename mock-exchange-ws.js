const { EventEmitter } = require('events')
const { genInRange } = require('./generators')

class MockExchangeWss {
  constructor() {
    this.emitter = new EventEmitter()
    setInterval(() => {
      this.emitter.emit('message', this._generateFakeExchangeData())
    }, 1000)
  }

  on(event, cb) {
    this.emitter.on(event, cb)
  }

  _generateFakeExchangeData() {
    const json = {
      u: new Date().getTime(),
      s: 'ETHBTC',
      b: genInRange(0.05, 10e-5),
      B: genInRange(100, 1),
      a: genInRange(0.05, 10e-5),
      A: genInRange(100, 1),
    }
    return JSON.stringify(json)
  }
}

module.exports = { MockExchangeWss }
