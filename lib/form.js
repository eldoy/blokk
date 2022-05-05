const esc = require('escape-html')

module.exports = async function form(opt = {}) {

  const noop = function(){}

  let {
    action,
    redirect,
    message,
    query,
    buttons,
    fields = [],
    init,
    submit,
    upload
  } = opt

  console.log({ action, redirect })

  if (!upload) {
    async function upload() {
      console.log('Uploading')
      var urls = await api('/upload/create', {},
        {
          files: input.files,
          progress: function (event) {
            var { loaded, total, percent } = event
            text('.progress', `${(loaded / 1024).toFixed(2)} kB/${(total / 1024).toFixed(2)} kB, ${percent}%`)
          }
        }
      )
      if (urls && urls.length) {
        html('.result', urls.map(url => `<img src="${url}">`), 'end')
      }
    }
  }

  if (!submit) {
    submit = async function(btn) {
      console.log('Submitting')
      btn.disabled = true
      var form = btn.form
      var action = form.getAttribute('data-action')
      var message = form.getAttribute('data-message')
      var redirect = form.getAttribute('data-redirect')
      var query = form.getAttribute('data-query')
      console.log({ action, message, redirect, query })
      var values = serialize(form)
      var data = { values }
      if (query) {
        data.query = JSON.parse(query)
      }
      var result = await api(action, data)
      console.log(result)
      if (!showErrors(result)) {
        if (message) {
          if (typeof redirect == 'string') {
            window.cookie('flash', message)
          } else {
            window.flash(message)
          }
        }
        if (typeof redirect == 'string') {
          window.location = redirect
        }
      }
      btn.disabled = false
    }
  }


  let h = `<form onsubmit="return false"`
  if (action) h += ` data-action="${action}"`
  if (message) h += ` data-message="${message}"`
  if (typeof redirect == 'string') {
    h += ` data-redirect="${redirect}"`
  }
  if (query) h += ` data-query="${JSON.stringify(query)}"`
  h += `>`

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

    if (type == 'radio' || type == 'checkbox') {
      h += `<fieldset><legend>${esc(name)}</legend>`
    } else {
      h += `<p><label for="${name}">${esc(name)}</label><br>`
    }

    if (desc) {
      h += `<small>${esc(desc)}</small>`
    }

    // Textarea
    if (type == 'textarea' || type == 'markup') {
      h += `<textarea id="${name}" name="${name}" oninput="clearErrors(this)" data-default="" data-type="${type}">`
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
        h += `<img src="${value}">`
      }
      const val = typeof value != 'undefined' ? ` value="${esc(value)}"` : ''
      h += `<input id="${name}" type="hidden" name="${name}" ${val}>`
      h += `<input type="file" onchange="(${upload}(this))" data-name="${name}">`
      h += `<span id="${name}-progress"></span>`

    // Any other input field type
    } else {
      h += `<input id="${name}" type="${type}" name="${name}"`
      if (typeof value != 'undefined') {
        h += ` value="${esc(value)}"`
      }
      h += ` oninput="clearErrors(this)" data-default="">`
    }

    // Error messages
    h += `<em class="${name}-errors"></em>`

    if (type == 'radio' || type == 'checkbox') {
      h += `</fieldset>`
    } else {
      h += `</p>`
    }
  }

  if (typeof buttons == 'function') {
    h += await buttons()
  } else if (typeof buttons == 'string') {
    h += buttons
  } else {
    h += `<p><button onclick="(${submit}(this))">Save</button> <a href="javascript:void(0)" onclick="goBack()">Cancel</a></p>`
  }

  h += `</form>`

  if (typeof init == 'function') {
    h += `<script>(${init}())</script>`
  }

  return h
}
