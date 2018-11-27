const Logger = require('../timedLogger')

const partitionWork = (limit, parts) => {
  const avgParts = limit / parts
  return [...new Array(parts)].map((_, ix) => {
    const from = Math.ceil(ix * avgParts) + 1
    const to = Math.ceil((ix + 1) * avgParts)
    return { from, to }
  })
}

class CubeSupervisor {
  constructor () {
    this.logger = Logger()
    this.workers = {}
    this.partitions = []
  }

  _log (msg) {
    this.logger.log(`[SUPERVISOR] ${msg}`)
  }

  initialize (selfActor) {
    const params = selfActor.customParameters
    this.upperLimit = params.upperLimit
    this.partitions = partitionWork(this.upperLimit, params.workerCount)

    return selfActor.createChild(params.workerClass, {
      mode: 'forked',
      clusterSize: params.workerCount
    }).then(workers => { this.workers = workers })
  }

  run () {
    this._log('distributing work...')
    return Promise
      .all(this.partitions.map(this._sendAndReceivePartition.bind(this)))
      .then(resultArr => {
        this._log('combining results...')
        return [].concat.apply([], resultArr)
      })
  }

  _sendAndReceivePartition (partition) {
    this._log(`distributing ${JSON.stringify(partition)}`)
    return this.workers
      .sendAndReceive('calculate', partition)
      .then(partial => {
        this._log(`received: ${partial.from} -> ${partial.to}`)
        if (partial.error) {
          this._log(`error: ${partial.error}`)
          return []
        }
        return partial.result
      })
  }
}

module.exports = CubeSupervisor
