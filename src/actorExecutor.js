const actors = require('comedy')

const ActorExecutor = ActorObj => {
  const start = data => {
    const actorSystem = actors()
    actorSystem.getLog().setLevel(3)

    return actorSystem.rootActor()
      .then(rootActor => rootActor.createChild(ActorObj, { mode: 'forked' }))
      .then(actor => actor.sendAndReceive('execute', data))
      .catch(err => console.error(err))
      .finally(() => actorSystem.destroy())
  }
  return { start }
}

module.exports = ActorExecutor
