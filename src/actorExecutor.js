const actors = require('comedy')

const ActorExecutor = (ActorObj, customParameters) => {
  const actorSystem = actors()
  actorSystem.getLog().setLevel(3)

  return actorSystem.rootActor()
    .then(rootActor => rootActor.createChild(ActorObj, { customParameters }))
    .then(actor => actor.sendAndReceive('run'))
    .catch(err => { return { err } })
    .finally(() => actorSystem.destroy())
}

module.exports = ActorExecutor
