const elements = {}

elements.generateId = function() {
  return ('x' + Math.random()).replace('.', '')
}

module.exports = elements