const WebSocket = require('ws')
const { MockExchangeWss } = require('./mock-exchange-ws')
const { generateBidOrders, generateAskOrders } = require('./generators')

function run(server) {
  const wss = new WebSocket.Server({ server })
  const namespaces = {}

  const mockExchangeWss = new MockExchangeWss()
  mockExchangeWss.on('message', (msg) => {
    const json = JSON.parse(msg)
    const bids = generateBidOrders(json.b, json.B, 10)
    const asks = generateAskOrders(json.a, json.A, 10)
    if (namespaces['/mock']) {
      for (const ws of namespaces['/mock'].values()) {
        ws.send(JSON.stringify({ bids, asks }))
      }
    }
  })

  const realExchangeWss = new WebSocket(
    'wss://stream.binance.com:9443/ws/ethbtc@bookTicker'
  )
  realExchangeWss.on('message', (msg) => {
    const json = JSON.parse(msg)
    const bids = generateBidOrders(json.b, json.B, 10)
    const asks = generateAskOrders(json.a, json.A, 10)
    if (namespaces['/real']) {
      for (const ws of namespaces['/real'].values()) {
        ws.send(JSON.stringify({ bids, asks }))
      }
    }
  })

  wss.on('connection', (ws, request) => {
    const wsId = request.headers['sec-websocket-key']
    let ns = '/'
    switch (request.url) {
      case '/mock':
        ns = '/mock'
        break
      case '/real':
        ns = '/real'
        break
    }
    if (!namespaces[ns]) {
      namespaces[ns] = new Map()
    }
    namespaces[ns].set(wsId, ws)

    ws.on('close', () => {
      namespaces[ns].delete(wsId)
    })
  })

  wss.on('listening', () => {
    console.log('Web socket is running')
  })

  wss.on('error', (err) => {
    console.log(err)
  })
}

module.exports = run
