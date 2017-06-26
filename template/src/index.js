const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const http = require('http')
const debug = require('debug')('server:server')
const config = require('./config')
const router = require('./routes/main')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/client')))

app.use('/', router)

const port = normalizePort(config.port || '3000')
app.set('port', port)

const server = http.createServer(app)
server.on('error', onError)
server.on('listening', onListening)
server.listen(port)

function normalizePort(val) {
    var port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    /*eslint-disable indent */
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on ' + bind)
    console.log('Listening on ' + bind)
}
// 全局未捕获异常
process.on('uncaughtException', function (error) {
    console.trace(error)
    console.error('!!!uncaughtException!!!', error)
})