const esc = require('escape-html')
const { generateId } = require('./util/elements.js')

module.exports = async function(options = {}) {
  const id = generateId()

  const {
    title = 'List',
    size = 2,
    limit = 10,
    items = [],
    fetch = {},
    search = {},
    detail = function(item) {
      return item.id
    },
    edit = function(item) {
      return `<a href="/project/edit?project_id=${item.id}">Edit</a>`
    },
    del = function(item) {
      return `<a href="/project/delete?project_id=${item.id}">Delete</a>`
    }
  } = options

  function list() {
    if (!items.length) {
      return `<p class="empty">No items found...</p>`
    }

    return `<ul>${items.map(item => {
      return `
        <li>
          <div class="item">
            <a href="/project/show?project_id=${item.id}">${detail(item)}</a>
          </div>
          <div class="controls">
            ${edit(item)}
            ${del(item)}
          </div>
        </li>
      `
    }).join('')}</ul>
    `
  }

  return `
    <blokk-list id="${id}">
      <div class="top">
        <div class="title">
          <h${size}>${esc(title)}</h${size}>
          <a class="toggler" href="javascript:void(0)" onclick="window.${id}.toggle()">
            <img src="/img/search.svg">
          </a>
        </div>
        <div class="create">
          <a href="/project/new">+ Create new project</a>
        </div>
      </div>
      <div class="search">
        <input type="text" placeholder="Search for project..." oninput="window.${id}.input(this)">
      </div>
      <div class="items">${list()}</div>
      <div class="loadmore${items.length > 0 ? '' : ' hidden'}">
        <a href="javascript:void(0)" onclick="window.${id}.more()">+ Load More</a>
      </div>
    </blokk-list>
    <script>
      (function(){
        var searching = false
        var s = ''
        var page = 0
        var limit = ${limit}
        var el = q('${id}')
        var fetch = ${JSON.stringify(fetch)}
        var search = ${JSON.stringify(search)}
        var detail = ${detail}
        var edit = ${edit}
        var del = ${del}

        ${handleFetch}
        ${handleSearch}
        ${list}
        ${render}

        window['${id}'] = {
          more: ${more},
          toggle: ${toggle},
          input: ${input}
        }
      }())
    </script>
  `

  function handleFetch() {
    const { action, query, sort } = fetch
    const params = {
      query,
      sort,
      limit,
      skip: page * limit
    }
    return api(action, params)
  }

  function handleSearch() {
    const { action, query, sort } = search
    const params = {
      s,
      query,
      sort,
      limit,
      skip: page * limit
    }
    return api(action, params)
  }

  async function toggle() {
    var box = q('.search', el)
    page = 0
    if (box.classList.contains('open')) {
      searching = false
      s = ''
      box.classList.remove('open')
      items = await handleFetch()
    } else {
      searching = true
      box.classList.add('open')
      q('input', box).focus()
      items = []
    }
    render()
  }

  async function input(field) {
    s = field.value.trim()
    items = await handleSearch()
    render()
  }

  async function more() {
    page += 1
    items = searching
      ? await handleSearch()
      : await handleFetch()
    render()
  }

  function render() {
    q('.loadmore').classList.toggle('hidden', items.length < 1)
    html(q('.items', el), list())
  }

}
