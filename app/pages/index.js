module.exports = async function($) {
  $.page.title = 'Blokk Rapid Prototyper for HTML and CSS'

  return /* html */`
    <h1><img class="logo" src="/img/logo.png" height="40" width="40" alt="Blokk Elements logo">Blokk Elements</h1>
    <p>Javascript Rapid Prototyper for HTML and CSS.</p>
    ${await $.app.views.elements.form($)}
  `
}
