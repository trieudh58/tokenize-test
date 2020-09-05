function generateBidOrders(bidPrice, bidSize, maxLength = 10) {
  const TOTAL_LIMIT = 5
  const epsilon = 10e-4
  const list = [[bidPrice, bidSize]]
  let remaining = TOTAL_LIMIT - bidPrice * bidSize
  let current = bidPrice
  while (list.length < maxLength && remaining > 0) {
    const nextPrice = genInRange(current, 0.00001)
    const nextSize = genInRange((remaining - epsilon) / nextPrice, 0.1)
    list.push([nextPrice, nextSize])
    current = nextPrice
    remaining -= nextPrice * nextSize
  }
  return list.map(([x, y]) => [Number(x).toFixed(8), Number(y).toFixed(8)])
}

function generateAskOrders(askPrice, askSize, maxLength = 10) {
  const TOTAL_LIMIT = 150
  const epsilon = 10e-4
  const list = [[askPrice, askSize]]
  let remaining = TOTAL_LIMIT - askSize
  let current = +askPrice
  while (list.length < maxLength && remaining > 0) {
    const nextPrice = genInRange(current + epsilon, current)
    const nextSize = genInRange(remaining - epsilon, 10e-6)
    list.push([nextPrice, nextSize])
    current = nextPrice
    remaining -= nextSize
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
