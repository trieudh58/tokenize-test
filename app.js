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
    wsns: '/mock',
  })
})

app.get('/part2', (req, res) => {
  res.render('partials/market', {
    title: 'Part 2',
    wsns: '/real',
  })
})

const server = app.listen(port, '0.0.0.0', () => {
  console.log('App is running at port', port)
})

module.exports = { server }
