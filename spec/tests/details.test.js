const assert = require('assert')

const details = require('../../lib/details.js')

const it = {}, x = {}

it['should render default details'] = async function() {
  const result = await details()
  assert.equal(result, '<div class="details"><h2>Details</h2></div>')
}

it['should render custom title'] = async function() {
  const result = await details({
    title: 'Hello'
  })
  assert.equal(result, '<div class="details"><h2>Hello</h2></div>')
}

it['should render description'] = async function() {
  const result = await details({
    desc: 'hello'
  })
  assert.equal(result, '<div class="details"><h2>Details</h2><p>hello</p></div>')
}

it['should render edit link'] = async function() {
  const result = await details({
    edit: 'edit'
  })
  assert.equal(result, '<div class="details"><nav>edit</nav><h2>Details</h2></div>')
}

it['should render delete link'] = async function() {
  const result = await details({
    delete: 'delete'
  })
  assert.equal(result, '<div class="details"><nav>delete</nav><h2>Details</h2></div>')
}

it['should render item details as object'] = async function() {
  const result = await details({
    item: { name: 'hello', email: 'hello@example.com' }
  })
  assert.equal(result, '<div class="details"><h2>Details</h2><dl><dt>name</dt><dd>hello</dd><dt>email</dt><dd>hello@example.com</dd></dl></div>')
}

it['should render item details as function'] = async function() {
  const user = { name: 'hello', email: 'hello@example.com' }
  const result = await details({
    item: function() {
      return `name: ${user.name}, email: ${user.email}`
    }
  })
  assert.equal(result, '<div class="details"><h2>Details</h2>name: hello, email: hello@example.com</div>')
}

module.exports = it