const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('partials/home', { title: 'Home' })
})
app.get('/part1', (req, res) => {
  res.render('partials/market', {
    title: 'Part 1',
    wsUrl: 'ws://127.0.0.1:9443',
  })
})
app.get('/part2', (req, res) => {
  res.render('partials/market', {
    title: 'Part 2',
    wsUrl: 'wss://stream.binance.com:9443/ws/ethbtc@depth10@1000ms',
  })
})

app.listen(port, '0.0.0.0', () => {
  console.log('App is running at port', port)
})
