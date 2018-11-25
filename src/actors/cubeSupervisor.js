const Logger = require('../timedLogger')

const SliceGenerator = (limit, sliceLength) => {
  let nextStart = 0

  const hasNext = () => nextStart < limit
  const next = () => {
    if (!hasNext()) throw new Error('no more slices')
    const from = nextStart
    nextStart = Math.min(nextStart + sliceLength, limit)
    return { from, to: nextStart }
  }

  return { hasNext, next, limit }
}

class CubeSupervisor {
  constructor () {
    this.logger = Logger()
    this.workers = {}
  }

  _log (msg) {
    this.logger.log(`[SUPERVISOR] ${msg}`)
  }

  initialize (selfActor) {
    const params = selfActor.customParameters
    this.slicer = SliceGenerator(params.upperLimit, params.sliceLength)

    return selfActor.createChild(params.workerClass, {
      mode: 'forked',
      clusterSize: params.workerCount
    }).then(workers => { this.workers = workers })
  }

  run () {
    this._log(`allocating Array(${this.slicer.limit})`)
    const result = [...new Array(this.slicer.limit)]
    this._log('distributing work...')

    // const sendAll = () => {
    //   Promise.all(workerConfigObjects.map(createWorker(rootActor)))
    //     const nextSlice = this.slicer.next()
    //     return this.workers
    //       .sendAndReceive('calculate', nextSlice.from, nextSlice.to)
    //       .then(result => {
    //         this._log(`received result from ${result}`)
    //       })
    //   }
    // }
    // return sendAll()
    // const sendPartials = () => {
    //   if (this.slicer.hasNext()) {
    //     const nextSlice = this.slicer.next()
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
