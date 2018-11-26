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
    this._log(`allocating Array(${this.upperLimit})`)
    const result = [...new Array(this.upperLimit)]
    this._log('distributing work...')

    return result
    // const sendAll = () => {
    //   Promise.all(workerConfigObjects.map(createWorker(rootActor)))
    //     const nextSlice = XXXXXX.next()
    //     return this.workers
    //       .sendAndReceive('calculate', nextSlice.from, nextSlice.to)
    //       .then(result => {
    //         this._log(`received result from ${result}`)
    //       })
    //   }
    // }
    // return sendAll()
    // const sendPartials = () => {
    //   if (XXXXXX.hasNext()) {
    //     const nextSlice = XXXXXX.next()
    //     return this.workers
    //       .sendAndReceive('calculate', nextSlice.from, nextSlice.to)
    //       .then(result => {
    //         this._log(`received result from ${result}`)
    //         return sendPartials()
    //       })
    //   } else {
    //     return Promise.resolve(result)
    //   }
    // }
    // return sendPartials()
  }
}

module.exports = CubeSupervisor
