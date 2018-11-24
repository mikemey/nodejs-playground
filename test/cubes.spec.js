const { calculateCubesTo } = require('../src/cubes')
const bigInt = require('big-integer')

const logger = require('../src/timedLogger')

describe.only('calculate cubes', () => {
  it('calculate small sample size', () => {
    calculateCubesTo(4).should.deep.equal([
      bigInt(1), bigInt(8), bigInt(27), bigInt(64)
    ])
  })

  it('calculate medium sample size', () => {
    const n = 10000000
    const result = calculateCubesTo(n)
    logger.log('[TEST] calculation done, checking...')
    result.should.have.length(n)
    const lastCube = result[result.length - 1]
    lastCube.should.deep.equal(bigInt('1000000000000000000000'))
    logger.log(`[TEST] last cube: ${lastCube.toString()}`)
  }).timeout(100000)
})
