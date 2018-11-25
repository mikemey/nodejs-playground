class CubeSupervisor {
  constructor () {
    this.parameters = {}
    this.workers = {}
  }

  initialize (selfActor) {
    this.parameters = selfActor.customParameters
    return selfActor.createChild(this.parameters.workerClass, {
      mode: 'forked',
      clusterSize: this.parameters.workerCount
    }).then(workers => { this.workers = workers })
  }
}

module.exports = CubeSupervisor
