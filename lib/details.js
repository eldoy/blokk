const esc = require('escape-html')

module.exports = function(options = {}) {

  const {
    title = 'Details',
    size = 2,
    desc,
    item,
    renderEdit,
    renderDelete
  } = options

  function renderControls() {
    if (renderEdit || renderDelete) {
      return `<nav>
        ${typeof renderEdit == 'function' ? renderEdit() : ''}
        ${typeof renderDelete == 'function' ? renderDelete() : ''}
      </nav>`
    }
    return ''
  }

  function renderDescription() {
    if (desc) {
      return `<p>${esc(desc)}</p>`
    }
    return ''
  }

  function renderItem() {
    if (typeof item == 'function') {
      return item()
    }

    if (typeof item == 'object') {
      const content = Object.keys(item)
        .map(k => `<dt>${k}</dt><dd>${esc(item[k])}</dd>`)
        .join('')
      return `<dl>${content}</dl>`
    }
    return ''
  }

  return /* html */`
    <blokk-details>
      ${renderControls()}
      <h${size}>${esc(title)}</h${size}>
      ${renderDescription()}
      ${renderItem()}
    </blokk-details>
  `
}
