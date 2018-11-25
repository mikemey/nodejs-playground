const Logger = () => {
  const currentTime = () => process.hrtime()[0]
  const start = currentTime()

  const log = msg => {
    const timePassed = currentTime() - start
    console.log(`${timePassed}: ${msg}`)
  }
  return { log }
}

module.exports = Logger
