module.exports = async function($) {

  return /* html */`
    <!doctype html>
    <html lang="${$.lang}">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${$.page.description || 'This is your universe.'}">
        <title>${$.page.title || '♥'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Karma:wght@600&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="/img/favicon.png">
        ${$.script('/bundle.js')}
        ${$.style('/bundle.css')}
        ${process.env.NODE_ENV == 'development' ? '<script src="/js/dev.js"></script>' : ''}
        <script>window.api = waveorb('${$.app.config.env.host}')</script>
      </head>
      <body>
        <header id="header">
          <nav class="flex">
            <div>
              <a href="${$.link('index')}">
                <img class="logo" src="/img/logo.png" height="25" width="25" alt="Blokk Elements logo">
                Home
              </a>
              <a href="/demos">Demos</a>
              <a href="/docs">Docs</a>
            </div>
            <div>
              <a href="https://github.com/eldoy/blokk">Code</a>
            </div>
          </nav>
        </header>
        <script>
          toggleVisibility()
          setActiveLink()
        </script>
        <div class="notify"><div class="flash" id="flash"></div></div>
        <main>${$.page.content}</main>
        <footer>
          Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
        </footer>
        <script>flash()</script>
      </body>
    </html>
  `
}
