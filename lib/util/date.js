const date = {}

date.transform = function(value) {
  if (typeof value == 'object') {
    value = value.toISOString()
  }
  return value.split('T')[0]
}

module.exports = date