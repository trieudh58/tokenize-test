const WebSocket = require('ws')
const { generateFakeMarketData } = require('./data/mock')

const port = process.env.WS_PORT || 9443
const ws = new WebSocket.Server({ port })

ws.on('connection', (ws) => {
  setInterval(() => {
    ws.send(JSON.stringify(generateFakeMarketData(10)))
  }, 1000)
})

ws.on('listening', () => {
  console.log('Web socket is running at port', port)
})

ws.on('error', (err) => {
  console.log(err)
})

module.exports = ws
