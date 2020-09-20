const http = require('http')
const cluster = require('cluster')
const clusterConfig = require('./cluster.config')

if (!clusterConfig()) {
  http.createServer((req, res) => {
    res.write(`Relou! ${cluster.worker.id}`)

    res.end()
  }).listen(3001)
}
