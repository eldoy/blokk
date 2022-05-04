module.exports = async function($) {
  $.page.title = 'Blokk Elements Docs'

  return /* html */`
    <h1>Blokk Elements Docs</h1>
    <p>These are the components currently included in Blokk Elements.</p>
    <p>
      Select your component:
    </p>
    <ul>
      <li>
        <a href="/doc/form">Form</a>
      </li>
      <li><a href="/doc/item">Item</a></li>
      <li><a href="/doc/list">List</a></li>
    </ul>
  `
}
