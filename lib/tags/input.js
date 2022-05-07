const esc = require('escape-html')

module.exports = function(type, name, value) {
  let h = ''
  h += `<input id="${name}" type="${type}" name="${name}"`
  if (typeof value != 'undefined') {
    h += ` value="${esc(value)}"`
  }
  return h + ` oninput="clearErrors(this)" data-default="">`
}