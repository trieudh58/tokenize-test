module.exports = {
  generateFakeMarketData: (size = 20) => {
    const bids = Array(size)
      .fill(0)
      .map((_) => [genInRange(0.5, 0.001), genInRange(1, 30)])
      .sort(([p1, _], [p2, __]) => p2 - p1)
    const asks = Array(size)
      .fill(0)
      .map((_) => [genInRange(0.5, 0.001), genInRange(1, 30)])
      .sort(([p1, _], [p2, __]) => p1 - p2)

    return { bids, asks }
  },
}

function genInRange(max, min, precision = 8) {
  return Number(Math.random() * (max - min) + min).toPrecision(precision)
}
