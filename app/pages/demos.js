module.exports = async function($) {
  $.page.title = 'Demos'

  return /* html */`
    <h1>Demos</h1>
    <p>Select the component to demo:</p>
    <ul>
      <li><a href="/demo/forms">Forms</a></li>
      <li><a href="/demo/lists">Lists</a></li>
      <li><a href="/demo/items">Items</a></li>
    </ul>
  `
}