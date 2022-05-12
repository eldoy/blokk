const esc = require('escape-html')
const { generateId } = require('./util/elements.js')

async function handleToggleSearch() {
  var search = q(`#${id} .search`)
  search.classList.toggle('open')
  state.searching = search.classList.contains('open')
  if (state.searching) {
    var input = q('input', search)
    input.focus()
  }
  const content = await renderList()
  html(`#${id} .items`, content)
}

async function handleSearch(input) {
  state.search = input.value.trim()
  const content = await renderList()
  html(`#${id} .items`, content)
}

async function handleLoadMore() {
  state.page += 1
  html(`#${id} .items`, renderList([]))
}

module.exports = async function(options = {}) {

  let {
    title = 'List',
    items = [],
    size = 2,
    data = {},
    search = {},
    row
  } = options

  const id = generateId()

  async function renderList(items) {
    if (!items) {
      if (state.searching) {
        if (typeof state.search == 'string' && state.search.length > 1) {
          let {
            action = '',
            query,
            limit = 10,
            sort = { created_at: -1 }
          } = search

          items = await api(action, {
            search: state.search,
            query,
            limit,
            sort
          })
        } else {
          items = []
        }

      } else {

        let {
          action = '',
          query,
          limit = 10,
          sort = { created_at: -1 }
        } = data

        items = await api(action, {
          query,
          limit,
          sort
        })
      }
    }

    if (!items.length) {
      return `<p class="empty">No items found...</p>`
    }

    return `<ul>${items.map(item => {
      const content = typeof row == 'function' ? row(item) : item.id
      return `
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

  const content = await renderList(items)

  return `
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
        <input type="text" placeholder="Search for project..." oninput="window.${id}.handleSearch(this)">
      </div>
      <div class="items">${content}</div>
      <div class="paginate">
        <a href="javascript:void(0)" onclick="window.${id}.handleLoadMore()">+ Load More</a>
      </div>
    </div>
    <script>
      (function(){
        var id = '${id}'
        var row = ${row}
        var data = ${JSON.stringify(data)}
        var search = ${JSON.stringify(search)}
        var state = {
          page: 1,
          searching: false
        }
        ${handleToggleSearch}
        ${handleSearch}
        ${handleLoadMore}
        ${renderList}

        window[id] = {
          handleToggleSearch,
          handleSearch,
          handleLoadMore
        }
      }())
    </script>
  `
}
