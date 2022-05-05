const db = require('mongowave')

module.exports = function() {
  return db({ name: 'blokk' })
}