const esc = require('escape-html')

module.exports = async function form(opt = {}) {

  function isImage(name) {
    return /\.(gif|jpe?g|tiff|png|bmp|svg)$/i.test(name)
  }

  let { button, fields = [], init, upload, save } = opt

  let h = `<form onsubmit="return false">`

  for (const field of fields) {
    const {
      name,
      value,
      type = 'text',
      desc = '',
      options = {}
    } = field

    // Transform value if it's for a date field
    if (typeof value != 'undefined' && type == 'date') {
      if (typeof value == 'object') {
        value = value.toISOString()
      }
      value = value.split('T')[0]
    }

    h += `<p><label for="${name}">${esc(name)}</label><br>`
    if (desc) {
      h += `<small>${esc(desc)}</small>`
    }

    // Textarea
    if (type == 'textarea' || type == 'markup') {
      const markup = type == 'markup' ? ' data-markup' : ''
      h += `<textarea id="${name}" name="${name}" oninput="clearErrors(this)" data-default=""${markup}>`
      if (typeof value != 'undefined') {
        h += esc(value)
      }
      h += `</textarea>`

    // Select
    } else if (type == 'select') {
      h += `<select id="${name}" name="${name}">`
      options.forEach(opt => {
        var text = opt[0].toUpperCase() + opt.slice(1)
        var selected = typeof value != 'undefined' && opt == value ? ' selected': ''
        h += `<option value="${opt}"${selected}>${text}</option>`
      })
      h += `</select>`

    // Checkbox
    } else if (type == 'checkbox') {
      options.forEach(opt => {
        var checked = typeof value != 'undefined' && value.includes(opt) ? ' checked': ''
        var text = opt[0].toUpperCase() + opt.slice(1)
        h += `<label class="checkbox"><input type="checkbox" name="${name}" value="${opt}"${checked}>${text}</label>`
      })

    // Radio
    } else if (type == 'radio') {
      options.forEach(opt => {
        var checked = typeof value != 'undefined' && opt == value ? ' checked': ''
        var text = opt[0].toUpperCase() + opt.slice(1)
        h += `<label class="radio"><input type="radio" name="${name}" value="${opt}"${checked} data-default="">${text}</label>`
      })

    // File
    } else if (type == 'file') {
      h += `<div id="${name}-file">`
      if (typeof value == 'string' && isImage(value)) {
        h += `<img src="${value}" style="max-height:60px">`
      }
      const val = typeof value != 'undefined' ? ` value="${esc(value)}"` : ''
      h += `<input id="${name}" type="hidden" name="${name}" ${val}>`
      h += `<input type="file" onchange="handleUpload(this)" data-name="${name}">`
      h += `<span id="${name}-progress"></span>`

    // Any other input field type
    } else {
      h += `<input id="${name}" type="${type}" name="${name}"`
      if (typeof value != 'undefined') {
        h += ` value="${esc(value)}"`
      }
      h += ` oninput="clearErrors(this)" data-default="">`
    }
    h += `<em class="${name}-errors"></em></p>`
  }

  if (typeof button == 'function') {
    h += await button()
  } else if (typeof button == 'string') {
    h += button
  } else {
    h += `<p><button onclick="handleSave(this)">Save</button><a href="javascript:void(0)" onclick="goBack()">Cancel</a></p>`
  }

  h += `</form>`

  return h
}
