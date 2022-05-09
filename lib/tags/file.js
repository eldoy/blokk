const esc = require('escape-html')
const upload = require('../handlers/upload.js')
const { isImage } = require('../util/image.js')
const { generateId } = require('../util/elements.js')

module.exports = function({ name, options, value }) {
  let h = '', id = generateId()
  h += `<div id="${name}-file">`
  if (typeof value == 'string' && isImage(value)) {
    h += `<img src="${value}">`
  }
  // TODO: Add support for all file types with badge
  h += '</div>'

  const val = typeof value != 'undefined' ? ` value="${esc(value)}"` : ''
  h += `<input id="${name}" type="hidden" name="${name}"${val}>`

  const data = JSON.stringify(options || {})
  h += `<input id="${id}" type="file" data-name="${name}" data-upload="${esc(data)}">`
  h += `<span id="${name}-progress"></span>`

  console.log(upload)

  return h + `<script>q('#${id}').addEventListener('change', ${upload})</script>`
}
