module.exports = async function details(opt = {}) {

  const { size = 2, title = 'Details', desc, item } = opt

  let h = `<div class="details">`

  // Options
  if (opt.edit || opt.delete) {
    h += `<nav>`
    if (opt.edit) h += opt.edit
    if (opt.delete) h += opt.delete
    h += `</nav>`
  }

  // Header
  h += `<h${size}>${title}</h${size}>`

  // Description
  if (desc) {
    h += `<p>${desc}</p>`
  }

  // Item
  if (typeof item == 'object') {
    h += '<dl>'
    h += Object.keys(item).map(k => `<dt>${k}</dt><dd>${item[k]}</dd>`).join('')
    h += '</dl>'
  } else if (typeof item == 'function') {
    h += await item()
  }

  return h +`</div>`
}
