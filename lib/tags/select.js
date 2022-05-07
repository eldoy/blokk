module.exports = function(name, options, value) {
  let h = ''
  h += `<select id="${name}" name="${name}">`
  options.forEach(opt => {
    var text = opt[0].toUpperCase() + opt.slice(1)
    var selected = typeof value != 'undefined' && opt == value ? ' selected': ''
    h += `<option value="${opt}"${selected}>${text}</option>`
  })
  return h + `</select>`
}
