const esc = require('escape-html')
const tags = require('./tags')

function btoa(str) {
  return Buffer.from(str).toString('base64')
}

module.exports = async function form(options = {}) {

  let { buttons, fields = [] } = options
  const { action, message, redirect, query } = options
  const data = JSON.stringify(action, message, redirect, query)
  console.log(data)
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

    // Textarea
    if (type == 'textarea') {
      h += tags.textarea(field)

    // Code
    } else if (type == 'code') {
      h += tags.code(field)

    // Select
    } else if (type == 'select') {
      h += tags.select(field)

    // Checkbox
    } else if (type == 'checkbox') {
      h += tags.checkbox(field)

    // Radio
    } else if (type == 'radio') {
      h += tags.radio(field)

    // File
    } else if (type == 'file') {
      h += tags.file(field)

    // Any other input field type
    } else {
      h += tags.input(field)
    }

    // Error messages
    h += `<em class="${name}-errors"></em>`

    if (type == 'radio' || type == 'checkbox') {
      h += `</fieldset>`
    } else {
      h += `</p>`
    }
  }

  h += tags.buttons(buttons)

  h += `</form>`

  return h
}
