const esc = require('escape-html')
const { generateId } = require('./util/elements.js')
const List = require('./state/list.js')

module.exports = async function(options = {}) {
  const id = options.id = generateId()
  const list = new List(options)
  list.detail = options.detail
  list.edit = options.edit
  list.del = options.del
  list.items = options.items || []
  delete options.items

  return `
    <blokk-list id="${id}">
      <div class="top">
        <div class="title">
          <h${list.size}>${esc(list.title)}</h${list.size}>
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
      <div class="items">${list.html()}</div>
      <div class="loadmore${list.items.length > 0 ? '' : ' hidden'}">
        <a href="javascript:void(0)" onclick="window.${id}.more()">+ Load More</a>
      </div>
    </blokk-list>
    <script>
      (function(){
        ${List}
        var list = new List(${JSON.stringify(options)})
        list.el = document.querySelector('#${id}')
        list.detail = ${options.detail}
        list.edit = ${options.edit}
        list.del = ${options.del}
        window['${id}'] = list
      }())
    </script>
  `
}
