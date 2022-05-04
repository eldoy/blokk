const assert = require('assert')
const item = require('../../lib/item.js')

const it = {}, x = {}

it['should render default item'] = async function() {
  const result = await item()
  assert.equal(result, '<div class="item"><h2>Details</h2></div>')
}

it['should render custom title'] = async function() {
  const result = await item({
    title: 'Hello'
  })
  assert.equal(result, '<div class="item"><h2>Hello</h2></div>')
}

it['should render description'] = async function() {
  const result = await item({
    desc: 'hello'
  })
  assert.equal(result, '<div class="item"><h2>Details</h2><p>hello</p></div>')
}

it['should render edit link'] = async function() {
  const result = await item({
    edit: 'edit'
  })
  assert.equal(result, '<div class="item"><nav>edit</nav><h2>Details</h2></div>')
}

it['should render delete link'] = async function() {
  const result = await item({
    del: 'delete'
  })
  assert.equal(result, '<div class="item"><nav>delete</nav><h2>Details</h2></div>')
}

it['should render object'] = async function() {
  const result = await item({
    render: { name: 'hello', email: 'hello@example.com' }
  })
  assert.equal(result, '<div class="item"><h2>Details</h2><dl><dt>name</dt><dd>hello</dd><dt>email</dt><dd>hello@example.com</dd></dl></div>')
}

it['should render function'] = async function() {
  const user = { name: 'hello', email: 'hello@example.com' }
  const result = await item({
    render: function() {
      return `name: ${user.name}, email: ${user.email}`
    }
  })
  assert.equal(result, '<div class="item"><h2>Details</h2>name: hello, email: hello@example.com</div>')
}

module.exports = it