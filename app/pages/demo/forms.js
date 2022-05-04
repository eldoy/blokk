module.exports = async function($) {
  $.page.title = 'Form demos'

  return /* html */`
    <a href="/demos">&laquo; Back to demos</a>
    <h1>Form examples</h1>
    <ul>
      <li><a href="/demo/form/basic-form">Basic form</a></li>
      <li><a href="/demo/form/complex-form">Complex form</a></li>
    </ul>
  `
}