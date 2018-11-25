const bigInt = require('big-integer')
const Logger = require('../timedLogger')

class CubeWorker {
  constructor () {
    this.logger = Logger()
    this._logPrefix = `[WRK-${process.pid}]`
  }

  _log (msg) {
    this.logger.log(`${this._logPrefix}] ${msg}`)
  }

  calculate (from, to) {
    this._log(`received task ${from} to ${to}`)
    for (var i = from; i < to; i++) {
      bigInt(i).pow(3)
    }
    return this._logPrefix
  }
}

module.exports = CubeWorker
