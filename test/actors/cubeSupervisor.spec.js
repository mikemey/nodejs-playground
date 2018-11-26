const bigInt = require('big-integer')

const CubeSupervisor = require('../../src/actors/cubeSupervisor')
const ActorExecutor = require('../../src/actorExecutor')

describe('Cube supervisor', () => {
  it('should initalize cube workers and workpieces', () => {
    const workerDummies = { some: 'object' }
    const customParameters = {
      workerClass: 'testWorker',
      workerCount: 5,
      upperLimit: 17
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
      .then(() => {
        supervisor.workers.should.deep.equal(workerDummies)
        supervisor.partitions.should.deep.equal([
          { from: 1, to: 4 },
          { from: 5, to: 7 },
          { from: 8, to: 11 },
          { from: 12, to: 14 },
          { from: 15, to: 17 }
        ])
      })
  })

  //  const calculate = input => ActorExecutor('/src/actors/cubeSupervisor', input)
  //
  //  it('calculate small sample size', () => {
  //    const data = {
  //      workerClass: '/src/actors/cubeWorker',
  //      workerCount: 1,
  //      upperLimit: 13,
  //      sliceLength: 20
  //    }
  //    const expectation = [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197]
  //      .map(_ => bigInt(_))
  //    return calculate(data)
  //      .then(result => {
  //        console.log(result)
  //        result.should.deep.equal(expectation)
  //      })
  //  })

  // it('calculate medium sample size', () => {
  //   const logger = Logger()
  //   const n = 5000000
  //   const result = calculateCubesTo(n, logger)
  //   logger.log('[TEST] calculation done, checking...')
  //   result.should.have.length(n)
  //   const lastCube = result[result.length - 1]
  //   lastCube.should.deep.equal(bigInt('125000000000000000000'))
  // }).timeout(5000)
})
