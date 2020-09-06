function generateBidOrders(bidPrice, bidSize, maxLength = 10) {
  const TOTAL_LIMIT = 5
  const list = [[bidPrice, bidSize]]
  let capacity = TOTAL_LIMIT - bidPrice * bidSize
  let current = bidPrice
  while (list.length < maxLength && capacity > 0) {
    const nextLimit = capacity * genInRange(.5 ** list.length, .5 ** (list.length + 1))
    const diff = genInRange(10e-5, 10e-6)
    const nextPrice = current - diff
    const nextSize = nextLimit / nextPrice
    list.push([nextPrice, nextSize])
    current = nextPrice
    capacity -= nextPrice * nextSize
  }
  return list.map(([x, y]) => [Number(x).toFixed(8), Number(y).toFixed(8)])
}

function generateAskOrders(askPrice, askSize, maxLength = 10) {
  const TOTAL_LIMIT = 150
  const list = [[askPrice, askSize]]
  let capacity = TOTAL_LIMIT - askSize
  let current = +askPrice
  while (list.length < maxLength && capacity > 0) {
    const diff = genInRange(10e-5, 10e-6)
    const nextPrice = current + diff
    const nextSize = capacity * genInRange(.5 ** list.length, .5 ** (list.length + 1))
    list.push([nextPrice, nextSize])
    current = nextPrice
  }
  return list.map(([x, y]) => [Number(x).toFixed(8), Number(y).toFixed(8)])
}

function genInRange(max, min) {
  return Number(Math.random() * (max - min) + min)
}

module.exports = {
  genInRange,
  generateBidOrders,
  generateAskOrders,
}
