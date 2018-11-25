const ActorExecutor = require('./actorExecutor')

const data = {
  workerClass: '/src/actors/cubeWorker',
  workerCount: 2,
  upperLimit: 11000000,
  sliceLength: 5000000
}

ActorExecutor('/src/actors/cubeSupervisor', data)
  .then(result => {
    console.log('=== RESULT ===')
    console.log(result.slice(0, 50).map(bigInt => bigInt.toString()))
    console.log('resulting size: ' + result.length)
    console.log('last entry: ' + result[result.length - 1])
  })
