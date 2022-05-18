const esc = require('escape-html')
const tags = require('./tags')

module.exports = async function form(options = {}) {
  console.log(options)
  let { fields = [] } = options
  const { action, message, redirect, query } = options

  const data = JSON.stringify({ action, message, redirect, query })
  console.log({ data })
  let h = `<form onsubmit="return false" data-options="${esc(data)}">`

  for (const field of fields) {
    const { name, type, desc } = field

    if (type == 'radio' || type == 'checkbox') {
      h += `<fieldset><legend>${esc(name)}</legend>`
    } else {
      h += `<p><label for="${name}">${esc(name)}</label><br>`
    }

    if (desc) {
      h += `<small>${esc(desc)}</small>`
    }

    // Add input field
    h += (tags[type] || tags.input)(field)

    // Error messages
    h += `<em class="${name}-errors"></em>`

    if (type == 'radio' || type == 'checkbox') {
      h += `</fieldset>`
    } else {
      h += `</p>`
    }
  }

  h += tags.buttons(options)

  h += `</form>`

  return h
}
