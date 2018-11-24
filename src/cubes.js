const bigInt = require('big-integer')

const logger = require('./timedLogger')

const calculateCubesTo = upperLimit => {
  logger.log(`allocating array with ${upperLimit}`)
  const result = [...new Array(upperLimit)]
  logger.log('calulating cubes...')
  return result.map((_, index) => bigInt(index + 1).pow(3))
}

module.exports = {
  calculateCubesTo
}
