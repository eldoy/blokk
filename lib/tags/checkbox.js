module.exports = function({ name, options, value }) {
  let h = ''
  options.forEach(opt => {
    var checked = typeof value != 'undefined' && value.includes(opt) ? ' checked': ''
    var text = opt[0].toUpperCase() + opt.slice(1)
    h += `<label class="checkbox"><input type="checkbox" name="${name}" value="${opt}"${checked}>${text}</label>`
  })
  return h
}