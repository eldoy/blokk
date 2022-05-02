const esc = require('escape-html')

module.exports = async function form(opt = {}) {

  let { button } = opt

  let h = `<form onsubmit="return false">`

  const fields = [
    { name: 'hello' }
  ]

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

    console.log({ name, value, type, desc, options })

    h += `<p><label for="${name}">${esc(name)}</label><br>`
    if (desc) {
      h += `<small>${desc}</small>`
    }

    // Textarea
    if (type == 'area' || type == 'textarea') {
      h += `
        <textarea
          id="${name}"
          name="${name}"
          oninput="clearErrors(this)"
          style="min-height:160px"
          data-default="">${typeof value != 'undefined' ? esc(value) : ''}</textarea>
      `

    // Markup, load codemirror
    } else if (type == 'markup') {
      h += `
        <textarea
          id="${name}"
          name="${name}"
          oninput="clearErrors(this)"
          data-default="">${typeof value != 'undefined' ? esc(value) : ''}</textarea>
      `

    // Select
    } else if (type == 'select') {
      h += `
        <select id="${name}" name="${name}">
          ${options.map(opt => {
            return /* html */`
              <option value="${opt}"${typeof value != 'undefined' && opt == value ? ' selected': ''}>${opt[0].toUpperCase() + opt.slice(1)}</option>
            `
          }).join('')}
        </select>
      `

    // Checkbox
    } else if (type == 'checkbox') {
      h += `
        ${options.map(opt => {
          return /* html */`
            <label class="form-checkbox">
              <input
                type="checkbox"
                name="${name}"
                value="${opt}"
                ${typeof value != 'undefined' && value.includes(opt) ? ' checked': ''}>
              ${opt[0].toUpperCase() + opt.slice(1)}
            </label>
          `
        }).join('')}
      `

    // Radio
    } else if (type == 'radio') {
      h += `
        ${options.map(opt => {
          return /* html */`
            <label class="form-radio">
              <input
                type="radio"
                name="${name}"
                value="${opt}"
                ${typeof value != 'undefined' && opt == value ? ' checked': ''}
                data-default="">
              ${opt[0].toUpperCase() + opt.slice(1)}
            </label>
          `
        }).join('')}
      `

    // File
    } else if (type == 'file') {
      h += `
        <div id="${name}-image">${function(){
          if (typeof value == 'string' && isImage(value)) {
            return /* html */`<img src="${value}" style="max-height:60px">`
          }
          return ''
        }()}</div>
        <input
          id="${name}"
          type="hidden"
          name="${name}"
          ${typeof value != 'undefined' ? ` value="${esc(value)}"` : ''}>
        <input
          type="file"
          onchange="handleUpload(this)"
          data-name="${name}">
        <span id="${name}-progress"></span>
      `

    // Any other input field type
    } else {
      h += `
        <input
          id="${name}"
          type="${type}"
          name="${name}"
          ${typeof value != 'undefined' ? ` value="${esc(value)}"` : ''} oninput="clearErrors(this)"
          data-default="">
      `
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

  return h + `</form>`

  // TODO:
  // // Run initializers
  // fields.forEach(field => {
  //   if (type == 'markup') {
  //     editor(`#${name}`, options)
  //     var ta = q(`#${name}`)
  //     var label = q(`label[for=${name}]`)
  //     label.onclick = () => ta.editor.focus()
  //   }
  // })
}