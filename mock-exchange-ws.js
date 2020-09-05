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
      b: genInRange(0.05, 0.0001),
      B: genInRange(1, 100),
      a: genInRange(0.05, 0.0001),
      A: genInRange(1, 100),
    }
    return JSON.stringify(json)
  }
}

module.exports = { MockExchangeWss }
