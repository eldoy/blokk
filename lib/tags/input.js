const esc = require('escape-html')
const date = require('../util/date.js')

module.exports = function({ type = 'text', name, value }) {
  // Transform value if it's for a date field
  if (typeof value == 'string' && type == 'date') {
    value = date.transform(value)
  }

  let h = ''
  h += `<input id="${name}" type="${type}" name="${name}"`
  if (typeof value != 'undefined') {
    h += ` value="${esc(value)}"`
  }
  return h + ` oninput="clearErrors(this)" data-default="">`
}