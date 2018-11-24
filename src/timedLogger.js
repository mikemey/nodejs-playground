
const currentTime = () => process.hrtime()[0]
const start = currentTime()

const log = msg => {
  const timePassed = currentTime() - start
  console.log(`${timePassed}: ${msg}`)
}
module.exports = { log }
