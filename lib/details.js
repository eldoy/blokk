const esc = require('escape-html')

module.exports = async function details(opt = {}) {

  const { size = 2, title = 'Details', desc, edit, del, render } = opt

  let h = `<div class="details">`

  // Nav
  if (edit || del) {
    h += `<nav>`
    if (edit) h += edit
    if (del) h += del
    h += `</nav>`
  }

  // Title
  h += `<h${size}>${esc(title)}</h${size}>`

  // Description
  if (desc) {
    h += `<p>${esc(desc)}</p>`
  }

  // Item
  if (typeof render == 'object') {
    h += '<dl>'
    h += Object.keys(render).map(k => `<dt>${k}</dt><dd>${esc(render[k])}</dd>`).join('')
    h += '</dl>'
  } else if (typeof render == 'function') {
    h += await render()
  }

  return h +`</div>`
}
