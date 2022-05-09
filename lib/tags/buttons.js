const submit = require('../handlers/submit.js')
const { generateId } = require('../util/elements.js')

module.exports = function({ button }) {
  let h = '', id = generateId()
  h += `<p><button id="${id}">${button || 'Save'}</button> <a href="javascript:void(0)" onclick="goBack()">Cancel</a></p>`
  return h + `<script>q('#${id}').addEventListener('click', ${submit})</script>`
}
