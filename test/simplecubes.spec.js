const { calculateCubesTo } = require('../src/simplecubes')
const bigInt = require('big-integer')

const logger = require('../src/timedLogger')

describe('calculate cubes', () => {
  it('calculate small sample size', () => {
    const expectation = [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197]
      .map(_ => bigInt(_))
    calculateCubesTo(13).should.deep.equal(expectation)
  })

  it('calculate medium sample size', () => {
    const n = 2000000
    const result = calculateCubesTo(n)
    logger.log('[TEST] calculation done, checking...')
    result.should.have.length(n)
    const lastCube = result[result.length - 1]
    lastCube.should.deep.equal(bigInt('8000000000000000000'))
  })
})
