const CubeWorker = require('../../src/actors/cubeWorker')

describe('Cube worker', () => {
  const workerResult = (from, to) => {
    const worker = new CubeWorker()
    return worker.calculate({ from, to })
  }

  it('should return cubed results', () => {
    const from = 3
    const to = 7
    workerResult(from, to).should.deep.equal({
      from,
      to,
      result: ['27', '64', '125', '216', '343']
    })
  })

  it('should single result when from/to are equal', () => {
    const from = 3
    const to = 3
    workerResult(from, to).should.deep.equal({
      from,
      to,
      result: ['27']
    })
  })

  it('should return error when from is greater than to', () => {
    const from = 5
    const to = 3
    workerResult(from, to).should.deep.equal({
      from,
      to,
      error: `Invalid from/to: ${from}/${to}`
    })
  })
})
