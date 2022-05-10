const esc = require('escape-html')
const toggleHandler = require('./handlers/toggle.js')
const searchHandler = require('./handlers/search.js')
const { generateId } = require('./util/elements.js')

module.exports = async function list(opt = {}) {

  let {
    size = 2,
    title = 'List',
    desc,
    create,
    search,
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

  // Search button
  if (search) {
    const id = generateId()
    h += `<a id="${id}" href="javascript:void(0)" class="search">Search...</a>`
    h += `<script>q('#${id}').addEventListener('click', ${toggleHandler})</script>`
  }

  // Description
  if (desc) {
    h += `<p>${esc(desc)}</p>`
  }

  // Search field
  if (search) {
    h += `<input id="search" type="text" placeholder="Search for title..." data-search="${search}">`
    h += `<script>q('#search').addEventListener('input', ${searchHandler})</script>`
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
