const assert = require('assert')
const list = require('../../lib/list.js')

const it = {}, x = {}

it['should render default list'] = async function() {
  const result = await list()
  assert.equal(result, '<div class="list"><h2>List</h2></div>')
}

it['should render custom title'] = async function() {
  const result = await list({
    title: 'Hello'
  })
  assert.equal(result, '<div class="list"><h2>Hello</h2></div>')
}

it['should render description'] = async function() {
  const result = await list({
    desc: 'hello'
  })
  assert.equal(result, '<div class="list"><h2>List</h2><p>hello</p></div>')
}

it['should render create link'] = async function() {
  const result = await list({
    create: 'create'
  })
  assert.equal(result, '<div class="list"><nav>create</nav><h2>List</h2></div>')
}

it['should render items list as object, item only'] = async function() {
  const users = [
    { name: 'hello', email: 'hello@example.com' },
    { name: 'bye', email: 'bye@example.com' }
  ]
  const result = await list({
    render: users,
    item: async function(user) {
      return `item: ${user.name},`
    }
  })
  assert.equal(result, '<div class="list"><h2>List</h2><ul><li>item: hello,</li><li>item: bye,</li></ul></div>')
}

it['should render items list as object, item and show'] = async function() {
  const users = [
    { name: 'hello', email: 'hello@example.com' },
    { name: 'bye', email: 'bye@example.com' }
  ]
  const result = await list({
    render: users,
    item: async function(user) {
      return `item: ${user.name},`
    },
    show: async function(user) {
      return `show: ${user.name},`
    }
  })
  assert.equal(result, '<div class="list"><h2>List</h2><ul><li>item: hello,<nav>show: hello,</nav></li><li>item: bye,<nav>show: bye,</nav></li></ul></div>')
}

it['should render items list as object, item, edit and del'] = async function() {
  const users = [
    { name: 'hello', email: 'hello@example.com' },
    { name: 'bye', email: 'bye@example.com' }
  ]
  const result = await list({
    render: users,
    item: async function(user) {
      return `item: ${user.name},`
    },
    edit: async function(user) {
      return `edit: ${user.name},`
    },
    del: async function(user) {
      return `del: ${user.name},`
    }
  })
  assert.equal(result, '<div class="list"><h2>List</h2><ul><li>item: hello,<nav>edit: hello,del: hello,</nav></li><li>item: bye,<nav>edit: bye,del: bye,</nav></li></ul></div>')
}

it['should render items list as object, all options'] = async function() {
  const users = [
    { name: 'hello', email: 'hello@example.com' },
    { name: 'bye', email: 'bye@example.com' }
  ]
  const result = await list({
    render: users,
    item: async function(user) {
      return `item: ${user.name},`
    },
    show: async function(user) {
      return `show: ${user.name},`
    },
    edit: async function(user) {
      return `edit: ${user.name},`
    },
    del: async function(user) {
      return `del: ${user.name},`
    }
  })
  assert.equal(result, '<div class="list"><h2>List</h2><ul><li>item: hello,<nav>show: hello,edit: hello,del: hello,</nav></li><li>item: bye,<nav>show: bye,edit: bye,del: bye,</nav></li></ul></div>')
}

it['should render items list as function'] = async function() {
  const users = [
    { name: 'hello', email: 'hello@example.com' },
    { name: 'bye', email: 'bye@example.com' }
  ]
  const result = await list({
    render: function() {
      return `<ul>${users.map(user => `<li>name: ${user.name}, email: ${user.email}</li>`).join('')}</ul>`
    }
  })
  assert.equal(result, '<div class="list"><h2>List</h2><ul><li>name: hello, email: hello@example.com</li><li>name: bye, email: bye@example.com</li></ul></div>')
}

module.exports = it