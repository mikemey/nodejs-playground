const ActorExecutor = require('../src/actorExecutor')

describe('ActorExecutor', () => {
  it('should create actor and send execute message', () => {
    class TestActor {
      execute (input) {
        require('chai').should()
        input.should.deep.equal('abcd')
        return 'testresult'
      }
    }

    const executor = ActorExecutor(TestActor)
    return executor.start('abcd')
      .then(result => result.should.deep.equal('testresult'))
  })
})
