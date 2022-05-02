module.exports = async function($) {
  $.page.title = 'Blokk Rapid Prototyper for HTML and CSS'

  const elements = [
    'form',
    'list',
    'details'
  ]

  let sections = []
  for (const el of elements) {
    sections.push(await $.app.views.elements[el]($))
  }

  return /* html */`
    <h1><img class="logo" src="/img/logo.png" height="40" width="40" alt="Blokk Elements logo">Blokk Elements</h1>
    <p>Javascript Rapid Prototyper for HTML and CSS.</p>
    ${sections.join('\n')}
  `
}
