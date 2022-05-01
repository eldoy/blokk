const esc = require('escape-html')

module.exports = async function list(opt = {}) {

  let { size = 2, title = 'List', desc, create, render, item, show, edit, del } = opt

  let h = `<div class="list">`

  // Nav
  if (create) {
    h += `<nav>${create}</nav>`
  }

  // Title
  h += `<h${size}>${esc(title)}</h${size}>`

  // Description
  if (desc) {
    h += `<p>${esc(desc)}</p>`
  }

  // Items
  if (typeof render == 'object') {
    h += '<ul>'
    for (const row of render) {
      h += `<li>`
      if (typeof item == 'function') {
        h += await item(row)
      }
      if (show || edit || del) {
        h += `<nav>`
        if (typeof show == 'function') {
          h += await show(row)
        }
        if (typeof edit == 'function') {
          h += await edit(row)
        }
        if (typeof del == 'function') {
          h += await del(row)
        }
        h += `</nav>`
      }
      h += `</li>`
    }
    h += '</ul>'
  } else if (typeof render == 'function') {
    h += await render()
  }

  return h + `</div>`
}
