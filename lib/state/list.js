module.exports = class List {

  constructor(options) {
    this.title = options.title || 'List'
    this.size = options.size || 2
    this.limit = options.limit || 10
    this.fetch = options.fetch || {}
    this.search = options.search || {}
    this.id = options.id

    // Defaults
    this.searching = false
    this.s = ''
    this.page = 0
  }

  skip() {
    return this.page * this.limit
  }

  handleFetch() {
    const { action, query, sort } = this.fetch
    return api(action, {
      query,
      sort,
      limit: this.limit,
      skip: this.skip()
    })
  }

  handleSearch() {
    const { action, query, sort } = this.search
    return api(action, {
      s: this.s,
      query,
      sort,
      limit: this.limit,
      skip: this.skip()
    })
  }

  async toggle() {
    var search = q('.search', this.el)
    this.page = 0
    if (search.classList.contains('open')) {
      this.searching = false
      this.s = ''
      search.classList.remove('open')
      this.items = await this.handleFetch()
    } else {
      this.searching = true
      search.classList.add('open')
      q('input', search).focus()
      this.items = []
    }
    this.render()
  }

  async input(field) {
    this.s = field.value.trim()
    this.items = await this.handleSearch()
    this.render()
  }

  async more() {
    this.page += 1
    this.items = await this[this.searching
      ? 'handleSearch'
      : 'handleFetch'
    ]
    this.render()
  }

  render() {
    q('.loadmore').classList.toggle('hidden', this.items.length < 1)
    html(q('.items', this.el), this.html())
  }

  html() {
    if (!this.items.length) {
      return `<p class="empty">No items found...</p>`
    }

    return `<ul>${this.items.map(item => {
      let detail = this.detail ? this.detail(item) : item.id

      let edit = `<a href="/project/edit?project_id=${item.id}">Edit</a>`
      if (this.edit) edit = this.edit(item)

      let del = `<a href="/project/delete?project_id=${item.id}">Delete</a>`
      if (this.del) del = this.del(item)

      return `
        <li>
          <div class="item">
            <a href="/project/show?project_id=${item.id}">${detail}</a>
          </div>
          <div class="controls">
            ${edit}
            ${del}
          </div>
        </li>
      `
    }).join('')}</ul>
    `
  }
}