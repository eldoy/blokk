module.exports = async function upload() {
  console.log('Uploading')
  var input = event.currentTarget
  console.log(input)
  function progress(event) {
    var { loaded, total, percent } = event
    text('.progress', `${(loaded / 1024).toFixed(2)} kB/${(total / 1024).toFixed(2)} kB, ${percent}%`)
  }
  var urls = await api('/upload/create', {},
    { files: input.files, progress }
  )
  if (urls && urls.length) {
    html('.result', urls.map(url => `<img src="${url}">`), 'end')
  }
}