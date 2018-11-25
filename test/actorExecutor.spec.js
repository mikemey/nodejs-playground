const ActorExecutor = require('../src/actorExecutor')

describe('ActorExecutor', () => {
  it('should create actor, call run and pass customParameters', () => {
    class TestActor {
      initialize (selfActor) {
        this.passedArgs = selfActor.customParameters
      }
      run () {
        return this.passedArgs
      }
    }

    const testData = { a: 1, b: 'abc', c: { d: true } }
    return ActorExecutor(TestActor, testData)
      .then(result => result.should.deep.equal(testData))
  })

  it('should return error object when failing initialize', () => {
    class FailingTestActor {
      initialize () { throw new Error('TESTING-ERROR init') }
    }
    return ActorExecutor(FailingTestActor).then(expectErrorResult('TESTING-ERROR init'))
  })

  it('should return error object when failing run', () => {
    class FailingTestActor {
      run () { throw new Error('TESTING-ERROR run') }
    }
    return ActorExecutor(FailingTestActor).then(expectErrorResult('TESTING-ERROR run'))
  })

  const expectErrorResult = expectedErrorMessage => result => {
    result.err.should.be.an('error')
    result.err.message.should.equal(expectedErrorMessage)
  }
})
