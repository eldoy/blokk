module.exports = function(name, options, value) {
  let h = ''
  options.forEach(opt => {
    var checked = typeof value != 'undefined' && opt == value ? ' checked': ''
    var text = opt[0].toUpperCase() + opt.slice(1)
    h += `<label class="radio"><input type="radio" name="${name}" value="${opt}"${checked} data-default="">${text}</label>`
  })
  return h
}
