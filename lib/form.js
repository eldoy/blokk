const esc = require('escape-html')
const date = require('./util/date.js')
const tags = require('./tags')

module.exports = async function form(opt = {}) {

  let { buttons, fields = [] } = opt

  let h = tags.form(opt)

  for (const field of fields) {
    const {
      name,
      value,
      type = 'text',
      desc = '',
      options = {}
    } = field

    // Transform value if it's for a date field
    if (typeof value == 'string' && type == 'date') {
      value = date.transform(value)
    }

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
      h += tags.textarea(name, value)

    // Code
    } else if (type == 'code') {
      h += tags.code(name, options, value)

    // Select
    } else if (type == 'select') {
      h += tags.select(name, options, value)

    // Checkbox
    } else if (type == 'checkbox') {
      h += tags.checkbox(name, options, value)

    // Radio
    } else if (type == 'radio') {
      h += tags.radio(name, options, value)

    // File
    } else if (type == 'file') {
      h += tags.file(name, value)

    // Any other input field type
    } else {
      h += tags.input(type, name, value)
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
