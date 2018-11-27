const CubeSupervisor = require('../../src/actors/cubeSupervisor')
const ActorExecutor = require('../../src/actorExecutor')

describe('Cube supervisor', () => {
  describe('when initializing', () => {
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
  })

  describe('when runnig', () => {
    const calculate = input => ActorExecutor('/src/actors/cubeSupervisor', input)
    const testData = (workerCount, upperLimit) => {
      return {
        workerClass: '/src/actors/cubeWorker',
        workerCount,
        upperLimit
      }
    }

    it('calculate small sample size', () => {
      const expectation = ['1', '8', '27', '64', '125', '216', '343', '512', '729', '1000', '1331', '1728', '2197']
      return calculate(testData(2, 13))
        .then(result => result.should.deep.equal(expectation))
    })

    it('calculate medium sample size', () => {
      const upperLimit = 10000000
      return calculate(testData(5, upperLimit))
        .then(result => {
          result.should.have.length(upperLimit)
          result[result.length - 1].should.equal('1000000000000000000000')
          result[123455].should.equal('1881640295202816')
        })
    }).timeout(15000)
  })
})
