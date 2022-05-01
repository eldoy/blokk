module.exports = function form(schema, fields = [], entry) {
  if (!fields.length) {
    return html('form', /* html */`
      <p>Data fields are empty...</p>
    `)
  }

  fields = fields.map(field => {
    if (typeof field == 'string') {
      field = { name: field }
    }
    if (!field.type) {
      field.type = 'text'
    }
    return field
  })

  var cancel = `/site/${site.name}/schema/${schema.name}/`
  cancel += entry ? `entry/${entry.id}/show` : `show`

  html('form', /* html */`
    ${fields.map(field => {
      var value = (entry || {})[field.name]
      return /* html */`
        <p>
          <label for="${field.name}">
            ${esc(field.name)}
          </label>
          <br>
          ${function(){
            if (field.description) {
              return `<small>${field.description}</small>`
            }
            return ''
          }()}

          ${function(){
            // Textarea
            if (field.type == 'area' || field.type == 'textarea') {
              return /* html */`
                <textarea
                  id="${field.name}"
                  name="${field.name}"
                  oninput="clearErrors(this)"
                  style="min-height:160px"
                  data-default="">${typeof value != 'undefined' ? esc(value) : ''}</textarea>
              `
            }

            // Markup, load codemirror
            if (field.type == 'markup') {
              return /* html */`
                <textarea
                  id="${field.name}"
                  name="${field.name}"
                  oninput="clearErrors(this)"
                  data-default="">${typeof value != 'undefined' ? esc(value) : ''}</textarea>
              `
            }

            // Select
            if (field.type == 'select') {
              return /* html */`
                <select id="${field.name}" name="${field.name}">
                  ${field.options.map(opt => {
                    return /* html */`
                      <option value="${opt}"${typeof value != 'undefined' && opt == value ? ' selected': ''}>${opt[0].toUpperCase() + opt.slice(1)}</option>
                    `
                  }).join('')}
                </select>
              `
            }

            // Checkbox
            if (field.type == 'checkbox') {
              return /* html */`
                ${field.options.map(opt => {
                  return /* html */`
                    <label class="form-checkbox">
                      <input
                        type="checkbox"
                        name="${field.name}"
                        value="${opt}"
                        ${typeof value != 'undefined' && value.includes(opt) ? ' checked': ''}>
                      ${opt[0].toUpperCase() + opt.slice(1)}
                    </label>
                  `
                }).join('')}
              `
            }

            // Radio
            if (field.type == 'radio') {
              return /* html */`
                ${field.options.map(opt => {
                  return /* html */`
                    <label class="form-radio">
                      <input
                        type="radio"
                        name="${field.name}"
                        value="${opt}"
                        ${typeof value != 'undefined' && opt == value ? ' checked': ''}
                        data-default="">
                      ${opt[0].toUpperCase() + opt.slice(1)}
                    </label>
                  `
                }).join('')}
              `
            }

            // File
            if (field.type == 'file') {

              return /* html */`
                <div id="${field.name}-image">${function(){
                  if (typeof value == 'string' && isImage(value)) {
                    return /* html */`<img src="${value}" style="max-height:60px">`
                  }
                  return ''
                }()}</div>
                <input
                  id="${field.name}"
                  type="hidden"
                  name="${field.name}"
                  ${typeof value != 'undefined' ? ` value="${esc(value)}"` : ''}>
                <input
                  type="file"
                  onchange="handleUpload(this)"
                  data-name="${field.name}">
                <span id="${field.name}-progress"></span>
              `
            }

            if (typeof value != 'undefined' && field.type == 'date') {
              if (typeof value == 'object') {
                value = value.toISOString()
              }
              value = value.split('T')[0]
            }

            return /* html */`
              <input
                id="${field.name}"
                type="${field.type}"
                name="${field.name}"
                ${typeof value != 'undefined' ? ` value="${esc(value)}"` : ''} oninput="clearErrors(this)"
                data-default="">
            `
          }()}
          <em class="${field.name}-errors"></em>
        </p>
      `
    }).join('')}
    <p>
      <button onclick="handleSave(this)">Save</button>
      <a href="javascript:void(0)" onclick="goBack()">Cancel</a>
    </p>
  `)

  // Run initializers
  fields.forEach(field => {
    if (field.type == 'markup') {
      editor(`#${field.name}`, field.options)
      var ta = q(`#${field.name}`)
      var label = q(`label[for=${field.name}]`)
      label.onclick = () => ta.editor.focus()
    }
  })
}