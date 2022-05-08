const esc = require('escape-html')

module.exports = function({ name, value }) {
  let h = ''
  h += `<textarea id="${name}" name="${name}" oninput="clearErrors(this)" data-default="">`
  if (typeof value != 'undefined') {
    h += esc(value)
  }
  // TODO: Add script for activating codemirror
  return h + `</textarea>`
}
