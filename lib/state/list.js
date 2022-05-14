
// Idea: Maintain state and call this.update() which calls render() and inserts with html

module.exports = class List {

  constructor(options) {
    this.title = options.title || 'List'
    this.size = options.size || 2

    // Defaults
    this.searching = false
    this.s = ''
  }

  async toggle() {
    var search = q('.search', this.el)
    if (search.classList.contains('open')) {
      this.searching = false
      this.s = ''
      search.classList.remove('open')
      this.items = await this.fetch()
    } else {
      this.searching = true
      search.classList.add('open')
      q('input', search).focus()
      this.items = []
    }
    this.render()
  }

  render() {
    html(q('.items', this.el), this.html())
  }

  async input(field) {
    this.s = field.value.trim()
    this.items = await this.search(this.s)
    console.log(this.items)
    this.render()
  }

  async more() {
    this.page += 1
    this.items = await this.fetch()
    this.render()
  }

  html() {
    if (!this.items.length) {
      return `<p class="empty">No items found...</p>`
    }

    return `<ul>${this.items.map(item => {
      return `
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
    }).join('')}</ul>`
  }

}