const esc = require('escape-html')
const { generateId } = require('./util/elements.js')

class List {
  async handleToggleSearch() {
    var s = q('#search')
    if (s.classList.contains('open')) {
      s.classList.remove('open')
      const items = await this.render()
      console.log(items)
      html(`#${this.id} .items`, this.renderList(items))
    } else {
      s.classList.add('open')
      s.focus()
      html(`#${this.id} .items`, this.renderList([]))
    }
  }

  async handleSearch(input) {
    console.log('Handling search')
    console.log(input.value)
    const search = input.value
    const result = await api('/project/search', { search })
    console.log(result)
    html(`#${this.id} .items`, this.renderList(result))
  }

  renderItem(item) {
    return /* html */`
      <li>
        <div class="item">
          <a href="/project/show?project_id=${item.id}">${item.id}</a>
        </div>
        <div class="controls">
          <a href="/project/edit?project_id=${item.id}">Edit</a>
          <a href="/project/delete?project_id=${item.id}">Delete</a>
        </div>
      </li>
    `
  }

  renderList(items) {
    if (!items.length) {
      return `<p class="empty">No items found...</p>`
    }
    return `<ul>${items.map(this.renderItem).join('')}</ul>`
  }
}

module.exports = function list(opt = {}) {

  let { title = 'List', items = [], size = 2, render } = opt
  const id = generateId()

  const list = new List()

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
      <div class="items">${list.renderList(items)}</div>
    </div>
    <script>
      (function() {
        ${List}
        var list = new List()
        list.items = ${JSON.stringify(items)}
        list.render = ${render}
        list.id = '${id}'
        window.${id} = list
      }())
    </script>
  `
}
