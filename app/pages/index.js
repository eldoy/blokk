module.exports = async function($) {
  $.page.title = 'Blokk Rapid Prototyper for Web Applications'

  return /* html */`
    <style>
      main {
        text-align: center;
      }
    </style>
    <h1><img class="logo" src="/img/logo.png" height="40" width="40" alt="Blokk Elements logo">Blokk Elements</h1>
    <p>Javascript Rapid Prototyper Web Application Component Library.</p>
    <div style="max-width:600px;margin:0 auto;padding:1rem;border-radius:5px;margin-top:1.5rem">
      <b>Blokk boasts the following features:</b>
      <ul style="list-style-position:inside;padding:0">
        <li>Build web sites <i>fast</i></li>
        <li>Ready made Javascript components</li>
        <li>Purely functions, does not use JSX</li>
        <li>No dependencies</li>
      </ul>
    </div>
    <p style="margin-top:1.5rem">
      Are you ready to create web apps faster than <i>the speed of light</i>?
    </p>
    <p style="margin-top:2rem">
      <a class="button" href="/docs">Check out the docs</a>
    </p>
    <p>
      <a href="/demo">or check out the demo &raquo;</a>
    </p>
  `
}
