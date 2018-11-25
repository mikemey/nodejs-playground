const CubeSupervisor = require('../../src/actors/cubeSupervisor')

describe('Cube supervisor', () => {
  it('should create cube workers on initialize()', () => {
    const workerDummies = { some: 'data' }
    const customParameters = {
      workerClass: 'testWorker',
      workerCount: 5
    }
    const selfActorMock = {
      createChild: (actorClass, parameters) => {
        actorClass.should.equal(customParameters.workerClass)
        parameters.should.deep.equal({
          mode: 'forked',
          clusterSize: customParameters.workerCount
        })
        return Promise.resolve(workerDummies)
      },
      customParameters
    }
    const supervisor = new CubeSupervisor()
    return supervisor.initialize(selfActorMock)
      .then(() => supervisor.workers.should.deep.equal(workerDummies))
  })
})
