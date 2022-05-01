module.exports = function details(opt = {}) {
  const OPTIONS = {
    header: {},
    edit: {},
    delete: {},
    details: {}
  }

  opt = { ...OPTIONS, ...opt }

  function renderEditLink() {
    if (!opt.edit.link) return ''
    var text = opt.edit.text || 'Edit'
    return `<a class="blokk-edit" href="${opt.edit.link}">${text}</a>`
  }

  function renderDeleteLink() {
    if (!opt.delete.link) return ''
    var text = opt.delete.text || 'Delete'
    return `<a class="blokk-delete" href="${opt.delete.link}">${text}</a>`
  }

  const { size = 2, title = 'Details', description } = opt.header

  return `
    <div class="blokk-details">
      ${function(){
        if (!opt.edit.link && !opt.delete.link) return ''
        return `
          <div class="blokk-controls">
            ${renderEditLink()}
            ${renderDeleteLink()}
          </div>
        `
      }()}
      <h${size}>${title}</h${size}>
      ${function(){
        if (!description) return ''
        return `<p>${description}</p>`
      }()}
      ${function(){
        const { render, item } = opt.details
        if (typeof render != 'function') return ''
        return render(item)
      }()}
    </div>
  `
}