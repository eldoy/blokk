const esc = require('escape-html')

module.exports = async function list(opt = {}) {

  let {
    size = 2,
    title = 'List',
    desc,
    create,
    render,
    item,
    show,
    edit,
    del,
    empty
  } = opt

  let h = `<div class="list">`

  // Nav
  if (create) {
    h += `<nav class="create">${create}</nav>`
  }

  // Title
  h += `<h${size}>${esc(title)}</h${size}>`

  // Description
  if (desc) {
    h += `<p>${esc(desc)}</p>`
  }

  // Items
  if (typeof render == 'object') {
    if (render.length) {
      h += '<ul class="rows">'
      for (const row of render) {
        h += `<li class="row">`
        if (typeof item == 'function') {
          h += await item(row)
        }
        if (show || edit || del) {
          h += `<nav class="controls">`
          if (typeof show == 'function') {
            h += await show(row) + ' '
          }
          if (typeof edit == 'function') {
            h += await edit(row) + ' '
          }
          if (typeof del == 'function') {
            h += await del(row) + ' '
          }
          h += `</nav>`
        }
        h += `</li>`
      }
      h += '</ul>'
    } else {
      if (empty) {
        h += empty
      } else {
        h += `<p class="empty">List is empty.</p>`
      }
    }
  } else if (typeof render == 'function') {
    h += await render()
  }

  return h + `</div>`
}
