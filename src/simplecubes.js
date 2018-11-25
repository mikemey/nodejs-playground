const bigInt = require('big-integer')

const Logger = require('./timedLogger')

const calculateCubesTo = (upperLimit, logger = Logger()) => {
  logger.log(`allocating Array(${upperLimit})`)
  const result = [...new Array(upperLimit)]
  logger.log('calulating cubes...')
  return result.map((_, index) => bigInt(index + 1).pow(3))
}

module.exports = {
  calculateCubesTo
}
