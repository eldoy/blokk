const OPTIONS = {
  header: {},
  search: {}
}

module.exports = async function list(opt = {}) {
  opt = { ...OPTIONS, ...opt }

  function renderHeader() {
    if (opt.header.hide) return ''
    const { size = 1, text = 'List' } = opt.header
    return `<h${size}>${text}</h${size}>`
  }

  function renderSearch() {
    if (opt.search.hide) return ''

    const {
      type = 'text',
      placeholder = 'Search...',
      onchange = handleSearch
    } = opt.search

    return `
      <div class="blokk-search">
        <input
          type="${type}"
          placeholder="${placeholder}"
          onchange="${onchange}"
        >
      </div>
    `
  }

  async function handleSearch(input) {
    console.log('Handling search')
  }

  return `
    <div class="blokk-list">
      ${renderHeader()}
      ${renderSearch()}
    </div>
    <script>
      ${handleSearch}
    </script>
  `
}
