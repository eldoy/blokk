const assert = require('assert')
const form = require('../../lib/form.js')

const it = {}, x = {}

it['should render an empty form'] = async function() {
  const result = await form()
  assert.equal(result, `<form onsubmit="return false"></form>`)
}

it['should render a form with buttons'] = async function() {
  const result = await form({
    button: async function() { return 'hello' }
  })

  assert.equal(result, '<form onsubmit="return false">hello</form>')
}

module.exports = it