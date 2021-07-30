function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

module.exports = randomNumberBetween;
