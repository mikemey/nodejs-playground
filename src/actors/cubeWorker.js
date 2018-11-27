const bigInt = require('big-integer')
const Logger = require('../timedLogger')

class CubeWorker {
  constructor () {
    this.logger = Logger()
    this._logPrefix = `[ WRK-${process.pid}]`
  }

  _log (msg) {
    this.logger.log(`${this._logPrefix} ${msg}`)
  }

  _calculate (from, to) {
    return [...Array(to - from + 1)].map(_ => {
      const cube = bigInt(from).pow(3)
      from++
      return cube.toString()
    })
  }
  calculate (work) {
    const from = work.from
    const to = work.to
    this._log(`recv: ${from} -> ${to}`)
    if (from <= to) {
      work.result = this._calculate(from, to)
    } else {
      work.error = `Invalid from/to: ${from}/${to}`
    }
    this._log(`done: ${work.from} -> ${to}`)
    return work
  }
}

module.exports = CubeWorker
