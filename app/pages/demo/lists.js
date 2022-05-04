module.exports = async function($) {
  $.page.title = 'List demos'

  return /* html */`
    <a href="/demos">&laquo; Back to demos</a>
    <h1>List examples</h1>
    <ul>
      <li><a href="/demo/list/basic-list">Basic list</a></li>
      <li><a href="/demo/list/full-list">Full list</a></li>
      <li><a href="/demo/list/multiple-lists">Multiple lists</a></li>
      <li><a href="/demo/list/with-search">List with search</a></li>
    </ul>
  `
}