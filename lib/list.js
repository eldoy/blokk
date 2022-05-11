const esc = require('escape-html')
const { generateId } = require('./util/elements.js')

async function handleToggleSearch() {
  var s = q('#search')
  if (s.classList.contains('open')) {
    s.classList.remove('open')
    const items = await render()
    console.log(items)
    html(`#${id} .items`, renderList(items))
  } else {
    s.classList.add('open')
    s.focus()
    handleSearch(s)
  }
}

async function handleSearch(input) {
  console.log('Handling search')
  console.log(input.value)
  const search = input.value.trim()
  const result = search.length > 1
    ? await api('/project/search', { search })
    : []
  console.log(result)
  html(`#${id} .items`, renderList(result))
}

module.exports = function(options = {}) {

  let {
    title = 'List',
    items = [],
    size = 2,
    render,
    row
  } = options

  const id = generateId()

  function renderList(items) {
    if (!items.length) {
      return `<p class="empty">No items found...</p>`
    }
    return `<ul>${items.map(item => {
      const content = typeof row == 'function' ? row(item) : item.id
      return /* html */`
        <li>
          <div class="item">
            <a href="/project/show?project_id=${item.id}">${content}</a>
          </div>
          <div class="controls">
            <a href="/project/edit?project_id=${item.id}">Edit</a>
            <a href="/project/delete?project_id=${item.id}">Delete</a>
          </div>
        </li>
      `
    }).join('')}</ul>`
  }

  return /* html */`
    <div id="${id}" class="list">
      <div class="top">
        <div class="title">
          <h${size}>${title}</h${size}>
          <a class="toggler" href="javascript:void(0)" onclick="window.${id}.handleToggleSearch()">
            <img src="/img/search.svg">
          </a>
        </div>
        <div class="create">
          <a href="/project/new">+ Create new project</a>
        </div>
      </div>
      <div class="search">
        <input id="search" type="text" placeholder="Search for project..." oninput="window.${id}.handleSearch(this)">
      </div>
      <div class="items">${renderList(items)}</div>
    </div>
    <script>
      (function(){
        var id = '${id}'
        var render = ${render}
        var row = ${row}
        ${handleToggleSearch}
        ${handleSearch}
        ${renderList}

        window[id] = {
          handleToggleSearch,
          handleSearch
        }
      }())
    </script>
  `
}
