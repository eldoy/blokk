module.exports = async function($) {
  $.page.title = 'Header only'

  return /* html */`
    <a href="/demo/items">&laquo; Back to item demos</a>
    <h1>Header only</h1>
  `
}