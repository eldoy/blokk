const assert = require('assert')
const parser = require('node-html-parser')
const form = require('../../lib/form.js')

const it = {}, x = {}

it['should render an empty form'] = async function() {
  const result = await form()
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render text input fields'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render text area fields'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render file input fields'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render select boxes'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render radio buttons'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

it['should render checkboxes'] = async function() {
  const result = await form({
    fields: [{
      name: 'hello'
    }]
  })
  const doc = parser.parse(result)
  assert.equal(doc.firstChild.rawTagName, 'form')
}

module.exports = it
