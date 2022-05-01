module.exports = function list(opt = {}) {
  const OPTIONS = {
    header: {},
    search: {},
    list: {},
    create: {}
  }

  opt = { ...OPTIONS, ...opt }

  function renderCreate() {
    if (!opt.create.link) return ''
    const text = opt.create.text || 'Create new'
    return `<div class="blokk-controls"><a href="${opt.create.link}"><span class="add">+</span> ${text}</a></div>`
  }

  function renderHeader() {
    if (opt.header.hide) return ''
    const { size = 1, title = 'List', description } = opt.header
    return `
      <h${size}>${title}</h${size}>
      ${function(){
        if (!description) return ''
        return `<p>${description}</p>`
      }()}
    `
  }

  function renderList() {
    let {
      title = '',
      items,
      edit,
      del,
      render,
      name = 'items',
      empty
    } = opt.list

    if (!empty) empty = `<p>No ${name} found...</p>`
    if (!items || !render || !items.length) return empty

    function renderEdit(item) {
      if (typeof edit != 'function') return ''
      const { link = '', text = 'Edit' } = edit(item)
      return `<a href="${link}">${text}</a>`
    }

    function renderDelete(item) {
      if (typeof del != 'function') return ''
      const { link, text = 'Delete' } = del(item)
      return `<a href="${link}">${text}</a>`
    }

    function renderItem(item) {
      const edit = renderEdit(item)
      const del = renderDelete(item)
      return `<li>
        ${render(item)}
        ${function(){
          if (edit || del) {
            return `<span class="blokk-controls">${edit}${del}</span>`
          }
          return ''
        }()}
        </li>
      `
    }

    return `${title}
      <ul class="blokk-list">${items.map(renderItem).join('')}</ul>
    `
  }

  return `
    <div class="blokk-list">
      ${renderCreate()}
      ${renderHeader()}
      ${renderList()}
    </div>
  `
}

// Not in use:
// function renderSearch() {
//   if (opt.search.hide) return ''

//   const {
//     type = 'text',
//     placeholder = 'Search...',
//     onchange = 'handleSearch(this)'
//   } = opt.search

//   return `
//     <div class="blokk-search">
//       <input
//         type="${type}"
//         placeholder="${placeholder}"
//         oninput="${onchange}"
//       >
//     </div>
//   `
// }
