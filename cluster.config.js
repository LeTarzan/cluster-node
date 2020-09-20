const cluster = require('cluster')
const numCPUS = require('os').cpus().length

module.exports = createWorkers = () => {
  if (!cluster.isMaster) return false

  console.log('Processo principal está rodando')

  for (let i = 0; i < numCPUS; i++) {
    const p = cluster.fork()
    console.log(`Worker criado com pid: ${p.process.pid}`)
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} morreu com o código: ${code}`)
    console.log(`Iniciando um novo Worker`)
    cluster.fork()
  })

  return true
}