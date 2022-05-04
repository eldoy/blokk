module.exports = async function($) {
  $.page.title = 'Item demos'

  return /* html */`
    <a href="/demos">&laquo; Back to demos</a>
    <h1>Item examples</h1>
    <ul>
      <li><a href="/demo/item/header-only">Header only</a></li>
      <li><a href="/demo/item/full-item">Full item</a></li>
    </ul>
  `
}