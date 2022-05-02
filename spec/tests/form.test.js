const assert = require('assert')
const parser = require('node-html-parser')
const form = require('../../lib/form.js')

const it = {}, x = {}

it['should render an empty form'] = async function() {
  const result = await form()
  assert.equal(result, `<form onsubmit="return false"><p><button onclick="(function(){}(this))">Save</button><a href="javascript:void(0)" onclick="goBack()">Cancel</a></p></form>`)
}

it['should render a form with button as function'] = async function() {
  const result = await form({
    button: async function() { return 'hello' }
  })
  const doc = parser.parse(result)
  const f = doc.querySelector('form')
  assert.equal(f.getAttribute('onsubmit'), 'return false')
  assert.equal(f.text, 'hello')
}

it['should render a form with button as string'] = async function() {
  const result = await form({
    button: 'hello'
  })
  const doc = parser.parse(result)
  const f = doc.querySelector('form')
  assert.equal(f.getAttribute('onsubmit'), 'return false')
  assert.equal(f.text, 'hello')
}

it['should render a text input from fields'] = async function() {
  const result = await form({
    fields: [{ name: 'hello' }]
  })
  const doc = parser.parse(result)
  const f = doc.querySelector('form')
  assert.equal(f.innerHTML, `<p><label for="hello">hello</label><br><input id="hello" type="text" name="hello" oninput="clearErrors(this)" data-default=""><em class="hello-errors"></em></p><p><button onclick="(function(){}(this))">Save</button><a href="javascript:void(0)" onclick="goBack()">Cancel</a></p>`)
}

it['should render a text area from fields'] = async function() {
  const result = await form({
    fields: [{ name: 'hello', type: 'textarea' }]
  })
  const doc = parser.parse(result)
  const f = doc.querySelector('form')
  assert.equal(f.innerHTML, `<p><label for="hello">hello</label><br><textarea id="hello" name="hello" oninput="clearErrors(this)" data-default=""></textarea><em class="hello-errors"></em></p><p><button onclick="(function(){}(this))">Save</button><a href="javascript:void(0)" onclick="goBack()">Cancel</a></p>`)
}

module.exports = it