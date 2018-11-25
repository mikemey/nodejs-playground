const ActorExecutor = require('../src/actorExecutor')

describe('ActorExecutor', () => {
  it('should create actor and pass customParameters', () => {
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
})
