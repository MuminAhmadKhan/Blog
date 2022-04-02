const app = require('./app')
const { PORT} = require('./utils/config')
const http = require('http')
const {log_info} = require('./utils/loggers')
const server = http.createServer(app)

server.listen(PORT, () => {
    log_info(`Server running on port ${PORT}`)
  })