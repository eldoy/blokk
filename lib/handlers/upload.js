module.exports = async function upload() {
  console.log('Uploading')
  var input = event.currentTarget
  console.log(input)
  var name = input.getAttribute('data-name')
  var { action, config } = JSON.parse(input.getAttribute('data-upload'))

  console.log({ action, config })

  function progress(event) {
    var { loaded, total, percent } = event
    var status = `${(loaded / 1024).toFixed(2)} kB/${(total / 1024).toFixed(2)} kB`
    text(`#${name}-progress`, `${status}, ${percent}%`)
  }

  var params = {}
  if (config) {
    params.config = config
  }

  console.log(params)

  var urls = await api(action || '/upload/create',
    params,
    { files: input.files, progress }
  )

  if (!urls || !urls.length) return

  q(`#${name}`).value = urls[0]
  html(`#${name}-file`, `<img src="${urls[0]}">`)
}
