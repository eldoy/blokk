const esc = require('escape-html')
const { generateId } = require('./util/elements.js')

module.exports = function(options = {}) {
  const id = generateId()

  const {
    el = '#app',
    title = 'List',
    size = 2,
    limit = 10,
    placeholder = 'Search...',
    items = [],
    handleFetch = function() {},
    handleSearch = function() {},
    renderCreate = function() {
      return `<a href="/project/new">+ Create new</a>`
    },
    renderInfo = function(item) {
      return `<a href="/project/show?project_id=${item.id}">${item.id}</a>`
    },
    renderEdit = function(item) {
      return `<a href="/project/edit?project_id=${item.id}">Edit</a>`
    },
    renderDelete = function(item) {
      return `<a href="/project/delete?project_id=${item.id}">Delete</a>`
    },
    renderEmpty = function() {
      return `<p class="empty">No items found...</p>`
    },
    renderToggler = function() {
      return `<img src="/img/search.svg">`
    },
    renderLoadmore = function() {
      return `+ Load More`
    }
  } = options

  const state = { items }

  // Render the items
  function renderItems() {
    if (!state.items.length) {
      return renderEmpty()
    }
    return /* html */`<ul>${state.items.map(item => {
      return /* html */`
        <li>
          <div class="item">
            ${renderInfo(item)}
          </div>
          <div class="controls">
            ${renderEdit(item)}
            ${renderDelete(item)}
          </div>
        </li>
      `
    }).join('')}</ul>
    `
  }

  // Render top
  function renderTop() {
    return /* html */`
      <div class="top">
        <div class="title">
          <h${size}>${esc(title)}</h${size}>
          <a class="toggler" href="javascript:void(0)" onclick="window.${id}.handleToggleSearch()">
            ${renderToggler()}
          </a>
        </div>
        <div class="create">${renderCreate()}</div>
      </div>
    `
  }

  // Render search
  function renderSearch() {
    return /* html */`
      <div class="search">
        <input type="text" placeholder="${placeholder}" oninput="window.${id}.handleInputChange(this)">
      </div>
    `
  }

  // Render pagination
  function renderPagination() {
    return /* html */`
      <div class="loadmore${items.length > 0 ? '' : ' hidden'}">
        <a href="javascript:void(0)" onclick="window.${id}.handleLoadMore()">
          ${renderLoadmore()}
        </a>
      </div>
    `
  }

  return /* html */`
    <blokk-list id="${id}">
      ${renderTop()}
      ${renderSearch()}
      <div class="items">${renderItems()}</div>
      ${renderPagination()}
    </blokk-list>
    <script>
      (function(){

        // Root element
        var el = document.querySelector('${el}')

        // Other elements
        var searchBox = el.querySelector('.search')
        var searchInput = searchBox.querySelector('input')
        var itemList = el.querySelector('.items')
        var pagination = el.querySelector('.loadmore')

        // Render functions
        var renderCreate = ${renderCreate}
        var renderInfo = ${renderInfo}
        var renderEdit = ${renderEdit}
        var renderDelete = ${renderDelete}
        var renderEmpty = ${renderEmpty}
        var renderToggler = ${renderToggler}
        var renderLoadmore = ${renderLoadmore}
        var renderItems = ${renderItems}

        // State
        var state = {
          items: ${JSON.stringify(items)},
          searching: false,
          search: '',
          skip: 0,
          limit: ${limit},
          sort: { created_at: -1 },
          hideLoadMore: false
        }

        // Handler functions
        var handleFetch = ${handleFetch}
        var handleSearch = ${handleSearch}

        async function handleToggleSearch() {
          state.searching = searchBox.classList.contains('open')
          state.skip = 0

          if (state.searching) {
            state.searching = false
            state.search = ''
            searchBox.classList.remove('open')
            state.items = await handleFetch(state)

          } else {
            state.searching = true
            searchBox.classList.add('open')
            searchInput.focus()
            state.items = []
          }
          state.hideLoadMore = state.items.length < state.limit
          renderList()
        }

        async function handleInputChange(field) {
          state.search = field.value.trim()
          state.items = state.search.length > 1
            ? await handleSearch(state)
            : []
          state.hideLoadMore = state.items.length < state.limit
          renderList()
        }

        async function handleLoadMore() {
          state.skip += state.limit
          var items = state.searching
            ? await handleSearch(state)
            : await handleFetch(state)
          state.hideLoadMore = items.length < state.limit
          state.items = state.items.concat(items)
          renderList()
        }

        // Re-render list items
        function renderList() {
          pagination.classList.toggle('hidden', state.hideLoadMore)
          itemList.innerHTML = renderItems()
        }

        // Expose handler functions
        window['${id}'] = {
          handleToggleSearch,
          handleInputChange,
          handleLoadMore
        }
      }())
    </script>
  `
}
